import { useQuery } from "@tanstack/react-query";
import {
  getTrendingProducts,
  getProductsByCategory,
  getProductById,
  getSearchProducts,
} from "@/lib/api/products";

export function useTrendingProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getTrendingProducts,
  });
}

export function useProductsByCategory(
  category: string,
  p0: { enabled: boolean }
) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as number),
    enabled: id !== null,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchProducts(query),
    enabled: query.trim().length > 0,
  });
}
