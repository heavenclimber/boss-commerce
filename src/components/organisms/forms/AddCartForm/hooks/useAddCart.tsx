import { useState } from "react";
import { useRouter } from "next/navigation";
import addcartUser from "@/services/addCart/fetcher";
import { setCarts } from "@/store/listCartSlice";
import { notification } from "@/contexts/SnackbarContext";
import { CartFormValues } from "@/schemas/addCart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

export function useAddcart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.carts.carts || []);
  const [isLoading, setIsLoading] = useState(false);

  const addcart = async (data: CartFormValues) => {
    setIsLoading(true);

    try {
      const res = await addcartUser(data);

      if (res) {
        const updatedCarts = [res, ...carts];
        dispatch(setCarts(updatedCarts));
        router.push("/cart");
        notification({
          type: "success",
          text: "Cart successfully created!",
        });
      } else {
        notification({
          type: "error",
          text: "Something wrong in adding cart",
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification({
        type: "error",
        text: err?.message || "Something wrong in adding cart",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { addcart, isLoading };
}
