import express from "express";
import {
  createOneProduct,
  deleteProduct,
  getProductByCategory,
  getProductByDescription,
  getProductById,
  getProductByTitle,
  updateOneProduct,
} from "../db.js";
import { Product } from "../models/product.js";
import { isProductValid } from "../utils/utils.js"

export const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    if (req.query.id) {
      const product = await getProductById(Number(req.query.id));
      if (!product) {
        return res.status(404).json({ message : "Product not found"})
      }
      return res.status(200).json(product);
    }

    if (req.query.title) {
      const product = await getProductByTitle(req.query.title);
            if (!product) {
        return res.status(404).json({ message : "Product not found"})
      }
      return res.status(200).json(product);
    }

    if (req.query.category) {
      const product = await getProductByCategory(req.query.category);
            if (!product) {
        return res.status(404).json({ message : "Product not found"})
      }
      return res.status(200).json(product);
    }

    if (req.query.description) {
      const product = await getProductByDescription(req.query.description);
            if (!product) {
        return res.status(404).json({ message : "Product not found"})
      }
      return res.status(200).json(product);
    }
    return res
      .status(400)
      .json({ message: "Search by id, title, category, or description" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const { id, title, description, price, category, rate } = req.body;
    const newProduct = new Product(
      id,
      title,
      description,
      price,
      category,
      rate,
    );

    if (!isProductValid(newProduct)) {
      return res.status(400).json({
        message: "Invalid Product Data",
      });
    }

    const product = await createOneProduct(newProduct);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const { title, description, price, category, rate } = req.body;
    const id = req.params.id;
    const product = new Product(id, title, description, price, category, rate);

    if (!isProductValid(product)) {
      return res.status(400).json({
        message: "Invalid Product Data",
      });
    }

    const updatedProduct = await updateOneProduct(product);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product Updated", product: updatedProduct });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await deleteProduct(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product Deleted", product: product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


