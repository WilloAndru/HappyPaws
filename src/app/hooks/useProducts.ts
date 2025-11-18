import { useQuery } from "@tanstack/react-query";
import { getTrendingProducts, getProductById } from "@/lib/api/products";

export function useTrendingProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getTrendingProducts,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
}
