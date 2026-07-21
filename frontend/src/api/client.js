const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/api/products${query ? `?${query}` : ""}`);
}

export function fetchProduct(id) {
  return request(`/api/products/${id}`);
}

export function fetchCategories() {
  return request("/api/categories");
}
