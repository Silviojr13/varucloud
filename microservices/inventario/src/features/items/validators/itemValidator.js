import { z } from 'zod';

const itemSchema = z.object({
  nome: z.string().min(1),
  sku: z.string().min(1),
  quantidade: z.number().int().nonnegative(),
  preco: z.number().nonnegative(),
  validade: z.string().datetime().optional() // ISO date string
});

const partialItemSchema = itemSchema.partial();

export class ItemValidator {
  static validate(itemData) {
    try {
      return itemSchema.parse(itemData);
    } catch (error) {
      if (error.name === 'ZodError') {
        throw new Error(`Invalid item data: ${JSON.stringify(error.errors)}`);
      }
      throw error;
    }
  }

  static validatePartial(itemData) {
    try {
      return partialItemSchema.parse(itemData);
    } catch (error) {
      if (error.name === 'ZodError') {
        throw new Error(`Invalid item data: ${JSON.stringify(error.errors)}`);
      }
      throw error;
    }
  }
}