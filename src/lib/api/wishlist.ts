import axios from "axios";

export const updateWishlist = async (userId: string, productId: number) => {
  const res = await axios.post("/api/wishlist", { userId, productId });
  return res.status;
};
