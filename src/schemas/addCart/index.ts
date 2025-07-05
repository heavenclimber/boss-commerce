// schemas/addCart.ts
import * as yup from "yup";

export const cartSchema = yup.object({
  id: yup.number().required(),
  userId: yup.number().required(),
  products: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        title: yup.string().required(),
        price: yup.number().required(),
        description: yup.string().required(),
        category: yup.string().required(),
        image: yup.string().url().required(),
        quantity: yup.number().required(),
      })
    )
    .min(1, "At least one product is required")
    .required("Products is required"),
});

export type CartFormValues = yup.InferType<typeof cartSchema>;
