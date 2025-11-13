import { listarProdutos, criarProduto } from "../services/produtos.service.js";

export async function getProdutos(req, res) {
  try {
    const produtos = await listarProdutos();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function postProduto(req, res) {
  try {
    await criarProduto(req.body);
    res.status(201).json({ message: "Produto criado!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

