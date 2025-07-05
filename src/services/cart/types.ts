export interface IProductObj {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  productId?: number;
  quantity: number;
}

export interface ICartObj {
  id: number;
  userId: number;
  products: IProductObj[];
}
