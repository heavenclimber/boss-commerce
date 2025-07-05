"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cartSchema, CartFormValues } from "@/schemas/addCart";
import TextInput from "@/components/atoms/TextInput";
import { Button } from "@mui/material";
import { useAddcart } from "./hooks/useAddCart";

const CreateCartForm = () => {
  const storedUser = localStorage.getItem("user");
  const userObj = JSON.parse(storedUser || "");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CartFormValues>({
    resolver: yupResolver(cartSchema),
    defaultValues: {
      id: 0,
      userId: userObj?.id,
      products: [
        {
          id: 0,
          title: "",
          price: 0,
          description: "",
          category: "",
          image: "",
        },
      ],
    },
  });

  const { addcart, isLoading } = useAddcart();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data: CartFormValues) => {
    addcart(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TextInput
        className="!mb-3 w-full"
        label="Cart ID"
        disableLabel
        disabled={isLoading}
        type="number"
        {...register("id")}
        error={!!errors.id}
        helperText={errors.id?.message}
      />

      <TextInput
        className="!mb-3 w-full"
        label="User ID"
        disableLabel
        disabled
        type="number"
        {...register("userId")}
        error={!!errors.userId}
        helperText={errors.userId?.message}
      />

      <div>
        <h3 className="font-semibold">Products</h3>

        {fields.map((item, index) => (
          <div key={item.id} className="border rounded p-4 space-y-2">
            <div className="flex justify-between items-center">
              <strong>Product #{index + 1}</strong>
              {fields.length > 1 && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <TextInput
              disableLabel
              label="ID"
              className="!mb-3 w-full"
              type="number"
              placeholder="ID"
              disabled={isLoading}
              {...register(`products.${index}.id`)}
              error={!!errors.products?.[index]?.id}
              helperText={errors.products?.[index]?.id?.message}
            />

            <TextInput
              disableLabel
              label="Title"
              className="!mb-3 w-full"
              placeholder="Title"
              disabled={isLoading}
              {...register(`products.${index}.title`)}
              error={!!errors.products?.[index]?.title}
              helperText={errors.products?.[index]?.title?.message}
            />

            <TextInput
              disableLabel
              label="Price"
              className="!mb-3 w-full"
              type="number"
              placeholder="Price"
              {...register(`products.${index}.price`)}
              error={!!errors.products?.[index]?.price}
              helperText={errors.products?.[index]?.price?.message}
              disabled={isLoading}
            />

            <TextInput
              disableLabel
              label="Description"
              className="!mb-3 w-full"
              placeholder="Description"
              {...register(`products.${index}.description`)}
              error={!!errors.products?.[index]?.description}
              disabled={isLoading}
              helperText={errors.products?.[index]?.description?.message}
            />

            <TextInput
              className="!mb-3 w-full"
              disableLabel
              label="Category"
              placeholder="Category"
              {...register(`products.${index}.category`)}
              error={!!errors.products?.[index]?.category}
              disabled={isLoading}
              helperText={errors.products?.[index]?.category?.message}
            />

            <TextInput
              className="!mb-3 w-full"
              placeholder="Image URL"
              disableLabel
              label="Image URL"
              {...register(`products.${index}.image`)}
              error={!!errors.products?.[index]?.image}
              disabled={isLoading}
              helperText={errors.products?.[index]?.image?.message}
            />

            <TextInput
              className="!mb-3 w-full"
              placeholder="Quantity"
              disableLabel
              label="Quantity"
              {...register(`products.${index}.quantity`)}
              error={!!errors.products?.[index]?.quantity}
              disabled={isLoading}
              helperText={errors.products?.[index]?.quantity?.message}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="text"
          color="primary"
          onClick={() =>
            append({
              id: 0,
              title: "",
              price: 0,
              description: "",
              category: "",
              image: "",
              quantity: 0,
            })
          }
        >
          + Add Product
        </Button>

        {errors.products?.message && (
          <p className="text-red-500 text-xs">{errors.products.message}</p>
        )}
      </div>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default CreateCartForm;
