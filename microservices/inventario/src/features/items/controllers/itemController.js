import itemService from '../services/itemService.js';
import { ItemValidator } from '../validators/itemValidator.js';

class ItemController {
  async getAllItems(req, res) {
    try {
      const items = await itemService.getAllItems();
      res.json(items);
    } catch (error) {
      console.error('GET /inventario', error);
      res.status(500).json({ error: 'Failed to retrieve items' });
    }
  }

  async getItemById(req, res) {
    try {
      const item = await itemService.getItemById(req.params.id);
      res.json(item);
    } catch (error) {
      if (error.message === 'Item not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('GET /inventario/:id', error);
      res.status(500).json({ error: 'Failed to retrieve item' });
    }
  }

  async createItem(req, res) {
    try {
      // Validate input data
      const validatedData = ItemValidator.validate(req.body);
      
      // Convert validade from string to Date if provided
      if (validatedData.validade) {
        validatedData.validade = new Date(validatedData.validade);
      }
      
      const item = await itemService.createItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error.message.includes('Invalid item data')) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message.includes('SKU already exists')) {
        return res.status(409).json({ error: error.message });
      }
      console.error('POST /inventario', error);
      res.status(500).json({ error: 'Failed to create item' });
    }
  }

  async updateItem(req, res) {
    try {
      // Validate input data
      const validatedData = ItemValidator.validatePartial(req.body);
      
      // Convert validade from string to Date if provided
      if (validatedData.validade) {
        validatedData.validade = new Date(validatedData.validade);
      }
      
      const item = await itemService.updateItem(req.params.id, validatedData);
      res.json(item);
    } catch (error) {
      if (error.message === 'Item not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('Invalid item data')) {
        return res.status(400).json({ error: error.message });
      }
      console.error('PUT /inventario/:id', error);
      res.status(500).json({ error: 'Failed to update item' });
    }
  }

  async deleteItem(req, res) {
    try {
      const result = await itemService.deleteItem(req.params.id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Item not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('DELETE /inventario/:id', error);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  }
}

export default new ItemController();