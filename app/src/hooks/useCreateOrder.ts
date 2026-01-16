import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { CreateOrderPayload } from "../types/CreateOrderPayload";

const createOrder = async (payload: CreateOrderPayload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/orders`,
    payload
  );
  return response.data;
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
