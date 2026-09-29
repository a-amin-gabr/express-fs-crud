import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url);

export const createOneProduct = async (product) => {
  try {
    const { products } = await getAllProducts();
    products.push(product);
    await saveDB(products);
    return product;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const createManyProducts = async (newProducts) => {
  try {
    const { products } = await getAllProducts();
    newProducts.forEach((product) => products.push(product));
    await saveDB(products);
    return products;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const getProductById = async (id) => {
  try {
    const { products } = await getAllProducts();
    const product = products.find((product) => {
      return product.id === id;
    });
    return product;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const getProductByTitle = async (title) => {
  try {
    const { products } = await getAllProducts();
    const product = products.find((product) => {
      return product.title.toLowerCase().includes(title.toLowerCase());
    });
    return product;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const getProductByCategory = async (category) => {
  try {
    const { products } = await getAllProducts();
    const product = products.find((product) => {
      return product.category.toLowerCase().includes(category.toLowerCase());
    });
    return product;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const getProductByDescription = async (description) => {
  try {
    const { products } = await getAllProducts();
    const product = products.find((product) => {
      return product.description.toLowerCase().includes(description.toLowerCase());
    });
    return product;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const getAllProducts = async () => {
  try {
    const contents = await fs.readFile(DB_PATH, { encoding: "utf8" });
    const products = await JSON.parse(contents);
    return products;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const updateOneProduct = async (updatedProduct) => {
  try {
    const { products } = await getAllProducts();
    const id = Number(updatedProduct.id);
    const index = products.findIndex((product) => {
      return product.id === id;
    });
    if (index === -1) {
      return null;
    }
    products[index] = {
      ...products[index],
      ...updatedProduct,
      id,
    };
    await saveDB(products);
    return products[index];
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const productId = Number(id);
    const { products } = await getAllProducts();
    const product = products.find((product) => product.id === productId);

    if (!product) {
      return null;
    }

    const filteredProducts = products.filter((product) => {
      return product.id !== productId;
    });

    await saveDB(filteredProducts);
    return product;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const deleteAllProducts = async () => {
  try {
    await saveDB([]);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const saveDB = async (products) => {
  const db = { products: products };
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(db));
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
