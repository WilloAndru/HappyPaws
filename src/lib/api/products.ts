import axios from "axios";

export async function getTrendingProducts() {
  const res = await axios.get("/api/products?sort=rating&limit=10");
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
