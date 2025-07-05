"use client";

import { IProductObj } from "@/services/cart/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
} from "@mui/material";
import React from "react";

interface ModalProductProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  products: IProductObj[] | [];
}

const ModalProduct: React.FC<ModalProductProps> = ({
  open,
  title = "",
  onClose,
  products,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth {...rest}>
      <DialogTitle>{title || ""} </DialogTitle>

      <DialogContent dividers>
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border p-4 flex flex-col gap-2 shadow-sm dark:border-gray-700"
            >
              <div className="font-semibold text-sm">{product.title}</div>

              <div className="text-xs">
                <strong>Price:</strong> ${product.price}
              </div>

              <div className="text-xs">
                <strong>Category:</strong> {product.category}
              </div>

              <div className="text-xs line-clamp-3">
                <strong>Description:</strong> {product.description}
              </div>

              <div className="text-xs line-clamp-3">
                <strong>Quantity:</strong> {product.quantity}
              </div>

              <a
                href={product.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-xs break-all"
              >
                View Image
              </a>
            </div>
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalProduct;
