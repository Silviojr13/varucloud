import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, index: true },
    quantidade: { type: Number, required: true, min: 0, default: 0 },
    preco: { type: Number, required: true, min: 0 },
    // opcional (tua feature de validade)
    validade: { type: Date, required: false }
  },
  { timestamps: true }
);

export default mongoose.model('Item', ItemSchema);
