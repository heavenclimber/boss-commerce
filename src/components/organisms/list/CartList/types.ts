import { IProductObj } from "@/services/cart/types";

export interface IModalProduct {
  open: boolean;
  cartId: number;
  products: IProductObj[] | [];
}
