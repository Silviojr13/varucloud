import { Router } from "express";
import { getProdutos, postProduto } from "../controllers/produtos.controller.js";

const router = Router();

router.get("/", getProdutos);
router.post("/", postProduto);

export default router;
