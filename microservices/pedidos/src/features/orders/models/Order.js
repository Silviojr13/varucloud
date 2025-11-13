// Basic Order model
export class Order {
  constructor({ id, customerId, items, total, status, createdAt }) {
    this.id = id;
    this.customerId = customerId;
    this.items = items || [];
    this.total = total || 0;
    this.status = status || 'pending';
    this.createdAt = createdAt || new Date();
  }
}