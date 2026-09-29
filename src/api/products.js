import express from "express";
import {
  createManyProducts,
  deleteAllProducts,
  getAllProducts,
} from "../db.js";
import { isProductValid } from "../utils/utils.js"

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { products } = await getAllProducts();
    return res.status(200).json({ Products: products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products)) {
      throw new TypeError("Request body must be an Array");
    }

    if (!products.every(isProductValid)) {
        return res.status(400).json({ message : "Some Products are Invalid" })
    }

    await createManyProducts(products);

    return res.status(201).json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

productsRouter.delete("/", async (req, res) => {
  try {
    await deleteAllProducts();
    return res.status(200).json({ message: "All Products Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
