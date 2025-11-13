import Item from '../models/Item.js';

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
      return await item.save();
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
      
      return { message: 'Item deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }
}

export default new ItemService();