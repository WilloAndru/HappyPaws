import { useQuery } from "@tanstack/react-query";
import {
  getTrendingProducts,
  getProductById,
  getSearchProducts,
} from "@/lib/api/products";

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

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchProducts(query),
    enabled: query.trim().length > 0,
  });
}
