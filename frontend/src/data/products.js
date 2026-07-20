import products from "./products.json";
import categories from "./categories.json";

const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

export const productsWithCategory = products.map((p) => ({
  ...p,
  category_name: categoryMap.get(p.category_id) ?? null,
}));

export function getProductById(id) {
  return productsWithCategory.find((p) => String(p.id) === String(id));
}
