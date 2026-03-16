import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { postAddToCart } from "../api/addToCart.api";
import { AddToCartRequest, AddToCartResponse } from "../types/cart.types";

export const useAddToCart = () => {
  return useMutation<AddToCartResponse, Error, AddToCartRequest>({
    mutationFn: postAddToCart,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Added to cart successfully!");
        // Optionally invalidate cart queries if they exist
        // queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        toast.error(data.message || "Failed to add to cart.");
      }
    },
    onError: (error: unknown) => {
      let errorMessage = "Something went wrong. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};
