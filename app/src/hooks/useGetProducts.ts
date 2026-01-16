import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Product } from "../types/Product";

type FetchProductsParams = {
  search?: string;
  categories?: string;
  productTypes?: string;
  discountedOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortOption?: any;
};

interface ProductsResponse {
  products: Product[];
  hasNextPage: boolean;
  total: number;
}

const fetchProducts = async (
  params: FetchProductsParams,
  pageParam: number
): Promise<ProductsResponse> => {
  const {
    search = "",
    categories = null,
    productTypes = null,
    discountedOnly = false,
    minPrice = 0,
    maxPrice = 50000,
    sortOption = "",
  } = params;

  const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
    params: {
      offset: pageParam,
      search,
      categories,
      productTypes,
      discountedOnly,
      minPrice,
      maxPrice,
      sortOption,
    },
  });

  return response.data;
};

export const useGetProducts = (params: FetchProductsParams) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["products", params],
    queryFn: ({ pageParam }) => fetchProducts(params, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNextPage) return undefined;
      return allPages.length * 40; // 40 is our page size
    },
    initialPageParam: 0,
  });
};
