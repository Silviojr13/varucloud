import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import produtosRouter from "./src/routes/produtos.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/produtos", produtosRouter);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`🚀 Microservice Produtos rodando na porta ${PORT}`);
});
