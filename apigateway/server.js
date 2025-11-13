import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API Gateway funcionando 🚀" });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`🚪 API Gateway na porta ${PORT}`));
