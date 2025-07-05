/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { Table } from "@/components/atoms";
import columnsListCart from "./columns";
import { useListCart } from "./hooks/useListCart";
import { ICartObj, IProductObj } from "@/services/cart/types";
import { SearchBar } from "@/components/molecules";
import { IModalProduct } from "./types";
import ModalProduct from "./components/ModalProduct";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCarts } from "@/store/listCartSlice";

const CartList = () => {
  const router = useRouter();
  const defaultModalProduct: IModalProduct = {
    open: false,
    cartId: 0,
    products: [],
  };
  const carts = useSelector((state: RootState) => state.carts.carts || []);
  const dispatch = useDispatch();

  const [modalProduct, setModalProduct] =
    useState<IModalProduct>(defaultModalProduct);
  const columns = columnsListCart(setModalProduct);
  const { cartList, isLoading } = useListCart();
  const [rows, setRows] = useState<ICartObj[]>([]);
  const [allRows, setAllRows] = useState<ICartObj[]>([]);
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const [searchBarValueFix, setSearchBarValueFix] = useState<string>("");

  const fetchData = async (type = "default") => {
    const result = await cartList();
    if (result) {
      setRows(result);
      if (type === "initial") {
        setAllRows(result);
      }
      dispatch(setCarts(result));
    }
  };

  console.log("banana", carts, rows, allRows);

  useEffect(() => {
    if (carts && carts?.length > 0) {
      setRows(carts);
      setAllRows(carts);
    } else {
      fetchData("initial");
    }
  }, [carts]);

  useEffect(() => {
    setRows(allRows);
  }, [allRows]);

  const handleSearchBarValue = () => {
    setSearchBarValueFix(searchBarValue);
  };

  useEffect(() => {
    if (!searchBarValueFix && (!carts || carts?.length === 0)) {
      fetchData();
    } else {
      const tempRows = JSON.parse(JSON.stringify(allRows));
      const rowsFiltered = tempRows.filter((cart: ICartObj) =>
        cart.products.some((product: IProductObj) =>
          product.title.toLowerCase().includes(searchBarValueFix.toLowerCase())
        )
      );
      setRows(rowsFiltered);
    }
  }, [searchBarValueFix]);

  const options = [{ id: "1", label: "Product's Title" }];

  return (
    <div>
      <ModalProduct
        open={modalProduct.open}
        title={`Cart ${modalProduct.cartId}'s Products`}
        products={modalProduct.products}
        onClose={() => {
          setModalProduct(defaultModalProduct);
        }}
      />
      <div className="flex items-center justify-between mb-5">
        <div className="font-bold text-xl">Cart List</div>
        <SearchBar
          options={options}
          searchType="1"
          disabled
          searchBarValue={searchBarValue}
          setSearchBarValue={setSearchBarValue}
          handleSearchBar={handleSearchBarValue}
        />
      </div>
      <Table columns={columns} loading={isLoading} rows={rows} />
      <Button
        className="!mt-5"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          router.push("/cart/create");
        }}
      >
        Add Cart
      </Button>
    </div>
  );
};

export default CartList;
