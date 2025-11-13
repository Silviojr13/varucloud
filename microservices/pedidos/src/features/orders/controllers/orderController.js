import orderService from '../services/orderService.js';

class OrderController {
  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('GET /pedidos', error);
      res.status(500).json({ error: 'Failed to retrieve orders' });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(parseInt(req.params.id));
      res.json(order);
    } catch (error) {
      if (error.message === 'Order not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('GET /pedidos/:id', error);
      res.status(500).json({ error: 'Failed to retrieve order' });
    }
  }

  async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error('POST /pedidos', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  async updateOrder(req, res) {
    try {
      const order = await orderService.updateOrder(parseInt(req.params.id), req.body);
      res.json(order);
    } catch (error) {
      if (error.message === 'Order not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('PUT /pedidos/:id', error);
      res.status(500).json({ error: 'Failed to update order' });
    }
  }

  async deleteOrder(req, res) {
    try {
      const result = await orderService.deleteOrder(parseInt(req.params.id));
      res.json(result);
    } catch (error) {
      if (error.message === 'Order not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('DELETE /pedidos/:id', error);
      res.status(500).json({ error: 'Failed to delete order' });
    }
  }
}

export default new OrderController();