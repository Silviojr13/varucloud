// Event-Driven Architecture tests
import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('Event-Driven Architecture', () => {
  it('should verify event publisher implementation', () => {
    const publisherPath = 'microservices/inventario/src/events/eventPublisher.js';
    assert.ok(fs.existsSync(publisherPath), 'Event publisher should exist');
    
    const publisherContent = fs.readFileSync(publisherPath, 'utf8');
    assert.ok(publisherContent.includes('publish'), 'Publisher should have publish method');
    assert.ok(publisherContent.includes('amqplib'), 'Publisher should use amqplib');
    
    console.log('✓ Event publisher implementation verified');
  });
  
  it('should verify event consumer implementation', () => {
    const consumerPath = 'microservices/pedidos/src/events/eventConsumer.js';
    assert.ok(fs.existsSync(consumerPath), 'Event consumer should exist');
    
    const consumerContent = fs.readFileSync(consumerPath, 'utf8');
    assert.ok(consumerContent.includes('subscribe'), 'Consumer should have subscribe method');
    assert.ok(consumerContent.includes('amqplib'), 'Consumer should use amqplib');
    
    console.log('✓ Event consumer implementation verified');
  });
  
  it('should verify event publishing in services', () => {
    const serviceFiles = [
      'microservices/inventario/src/features/items/services/itemService.js'
    ];
    
    serviceFiles.forEach(servicePath => {
      const serviceContent = fs.readFileSync(servicePath, 'utf8');
      assert.ok(serviceContent.includes('eventPublisher'), 
        `${servicePath} should import eventPublisher`);
      assert.ok(serviceContent.includes('publish'), 
        `${servicePath} should publish events`);
    });
    
    console.log('✓ Event publishing in services verified');
  });
  
  it('should verify event handling in consumers', () => {
    const handlerPath = 'microservices/pedidos/src/events/eventHandlers.js';
    assert.ok(fs.existsSync(handlerPath), 'Event handlers should exist');
    
    const handlerContent = fs.readFileSync(handlerPath, 'utf8');
    assert.ok(handlerContent.includes('handleProductCreated'), 
      'Should handle ProductCreated events');
    assert.ok(handlerContent.includes('handleProductUpdated'), 
      'Should handle ProductUpdated events');
    assert.ok(handlerContent.includes('handleProductDeleted'), 
      'Should handle ProductDeleted events');
    
    console.log('✓ Event handling verified');
  });
});