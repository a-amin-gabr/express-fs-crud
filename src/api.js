import express from "express";
import { productRouter } from "./api/product.js";
import { productsRouter } from "./api/products.js";

const PORT = 3000;
const app = express();
app.use(express.json());

app.use("/product", productRouter);
app.use("/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `not found` });
});

app.listen(PORT, (_) => console.log(`Server is running on port: ${PORT}`));
