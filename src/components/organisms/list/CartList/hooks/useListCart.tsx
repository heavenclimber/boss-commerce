import { useState } from "react";
import { notification } from "@/contexts/SnackbarContext";
import getCartList from "@/services/cart/fetcher";
import getProductDetail from "@/services/products/fetcher";
import { ICartObj, IProductObj } from "@/services/cart/types";

export function useListCart() {
  const [isLoading, setIsLoading] = useState(false);

  const cartList = async () => {
    setIsLoading(true);

    try {
      const res = await getCartList();
      if (res) {
        const allProductIds = res.flatMap((cart) =>
          cart.products.map((p) => p.productId)
        );
        const uniqueProductIds = [...new Set(allProductIds)];

        const productDetailPromises = uniqueProductIds.map((id) =>
          getProductDetail(id)
        );
        const allProductDetails = await Promise.all(productDetailPromises);

        const productMap = new Map<number, IProductObj>();
        allProductDetails.forEach((product) =>
          productMap.set(product.id, product)
        );

        const enrichedCarts: ICartObj[] = res.map((cart) => ({
          ...cart,
          products: cart.products.map(({ productId, quantity }) => {
            const productDetail = productMap.get(productId);
            return productDetail
              ? { ...productDetail, quantity }
              : {
                  id: productId,
                  title: "Unknown",
                  quantity,
                  price: 0,
                  description: "",
                  category: "",
                  image: "",
                  productId: productId,
                }; // fallback
          }),
        }));
        return enrichedCarts;
      } else {
        notification({
          type: "error",
          text: "Failed to get data",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification({
        type: "error",
        text: err?.message || "Failed to get data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { cartList, isLoading };
}
