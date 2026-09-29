export const isProductValid = (product) => {
  return (
    typeof product.title === "string" &&
    typeof product.description === "string" &&
    typeof product.category === "string" &&
    typeof product.price === "number" &&
    typeof product.rate === "number" &&
    Number.isInteger(Number(product.id)) &&
    product.rate >= 0 &&
    product.rate <= 5
  );
};