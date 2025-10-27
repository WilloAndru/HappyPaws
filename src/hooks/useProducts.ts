import axios from "axios";

export const getTopProducts = async () => {
  try {
    const res = await axios.get("/api/products?sort=rating&limit=10");
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
