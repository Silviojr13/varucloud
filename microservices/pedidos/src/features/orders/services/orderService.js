// Mock in-memory storage for orders
let orders = [];
let nextId = 1;

class OrderService {
  async getAllOrders() {
    return orders;
  }

  async getOrderById(id) {
    const order = orders.find(order => order.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async createOrder(orderData) {
    const order = {
      id: nextId++,
      ...orderData,
      createdAt: new Date()
    };
    orders.push(order);
    return order;
  }

  async updateOrder(id, orderData) {
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    orders[index] = {
      ...orders[index],
      ...orderData
    };
    
    return orders[index];
  }

  async deleteOrder(id) {
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    orders.splice(index, 1);
    return { message: 'Order deleted successfully' };
  }
}

export default new OrderService();