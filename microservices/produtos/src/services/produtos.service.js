import { getConnection } from "../database/connection.js";

export async function listarProdutos() {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM Produtos");
  return result.recordset;
}

export async function criarProduto(data) {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("nome", data.nome)
    .input("preco", data.preco)
    .query(`
      INSERT INTO Produtos (nome, preco)
      VALUES (@nome, @preco)
    `);

  return result;
}
