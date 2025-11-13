import Item from '../models/Item.js';
import eventPublisher from '../../../events/eventPublisher.js';

class ItemService {
  async getAllItems() {
    try {
      return await Item.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Failed to retrieve items: ${error.message}`);
    }
  }

  async getItemById(id) {
    try {
      const item = await Item.findById(id);
      if (!item) {
        throw new Error('Item not found');
      }
      return item;
    } catch (error) {
      throw new Error(`Failed to retrieve item: ${error.message}`);
    }
  }

  async createItem(itemData) {
    try {
      // Check if SKU already exists
      const existingItem = await Item.findOne({ sku: itemData.sku });
      if (existingItem) {
        throw new Error('SKU already exists');
      }
      
      const item = new Item(itemData);
      const savedItem = await item.save();
      
      // Publish event
      const event = {
        type: 'ProductCreated',
        payload: {
          id: savedItem._id,
          nome: savedItem.nome,
          sku: savedItem.sku,
          quantidade: savedItem.quantidade,
          preco: savedItem.preco,
          validade: savedItem.validade
        },
        timestamp: new Date().toISOString()
      };
      
      await eventPublisher.publish('varu.events', 'inventory.product.created', event);
      
      return savedItem;
    } catch (error) {
      throw new Error(`Failed to create item: ${error.message}`);
    }
  }

  async updateItem(id, itemData) {
    try {
      const item = await Item.findByIdAndUpdate(
        id,
        itemData,
        { new: true, runValidators: true }
      );
      
      if (!item) {
        throw new Error('Item not found');
      }
      
      // Publish event
      const event = {
        type: 'ProductUpdated',
        payload: {
          id: item._id,
          nome: item.nome,
          sku: item.sku,
          quantidade: item.quantidade,
          preco: item.preco,
          validade: item.validade
        },
        timestamp: new Date().toISOString()
      };
      
      await eventPublisher.publish('varu.events', 'inventory.product.updated', event);
      
      return item;
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  }

  async deleteItem(id) {
    try {
      const item = await Item.findByIdAndDelete(id);
      
      if (!item) {
        throw new Error('Item not found');
      }
      
      // Publish event
      const event = {
        type: 'ProductDeleted',
        payload: {
          id: item._id,
          nome: item.nome,
          sku: item.sku
        },
        timestamp: new Date().toISOString()
      };
      
      await eventPublisher.publish('varu.events', 'inventory.product.deleted', event);
      
      return { message: 'Item deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }
}

export default new ItemService();