import axios from "axios";

export async function getTrendingProducts() {
  const res = await axios.get("/api/products?sort=rating&limit=10");
  return res.data;
}

export async function getProductsByCategory(category: string) {
  const res = await axios.get(`/api/products?category=${category}&limit=10`);
  return res.data;
}

export async function getProducts() {
  const res = await axios.get("/api/products/");
  return res.data;
}

export async function getProductById(id: number) {
  const res = await axios.get(`/api/products/${id}`);
  return res.data;
}

export async function getSearchProducts(query: string) {
  const res = await axios.get(`/api/search?q=${query}`);
  return res.data;
}
