import axios from "axios";

export const updateWishlist = async (userId: string, productId: number) => {
  try {
    await axios.post("/api/wishlist", { userId, productId });
    return true;
  } catch {
    return false;
  }
};
