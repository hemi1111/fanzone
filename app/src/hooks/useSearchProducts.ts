import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/Product";

const fetchProducts = async (search: string = ""): Promise<Product[]> => {
  if (!search) return [];
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/products/search`,
    {
      params: { name: search },
    }
  );

  return response.data;
};

export const useSearchProducts = (search: string = "") => {
  return useQuery<Product[]>({
    queryKey: ["search-products", search],
    queryFn: () => fetchProducts(search),
    enabled: !!search,
  });
};
