import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/Product";

const fetchProduct = async (product_id: string = ""): Promise<Product> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/products/${product_id}`
  );

  return response.data;
};

export const useGetProduct = (product_id: string = "") => {
  return useQuery<Product>({
    queryKey: ["product", product_id],
    queryFn: () => fetchProduct(product_id),
    enabled: !!product_id,
  });
};
