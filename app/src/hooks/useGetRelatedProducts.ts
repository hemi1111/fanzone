import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/Product";

const fetchRelatedProducts = async (
  category: string,
  id: string
): Promise<Product[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/products/related/${category}/${id}`
  );
  return response.data;
};

export const useGetRelatedProducts = (category: string, id: string) => {
  return useQuery<Product[]>({
    queryKey: ["related-products", category, id],
    queryFn: () => fetchRelatedProducts(category, id),
    enabled: !!category && !!id, // prevents query from running with empty params
  });
};
