/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Skeleton, IconButton, Menu, MenuItem } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IModalProduct } from "./types";

const ActionMenu = ({
  row,
  setModalProduct,
}: {
  row: any;
  setModalProduct: React.Dispatch<React.SetStateAction<IModalProduct>>;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDetail = () => {
    setModalProduct({ open: true, products: row.products, cartId: row.id });
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick} size="medium">
        <MoreVertIcon fontSize="medium" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            minWidth: 200,
            boxShadow: 3,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleDetail();
          }}
        >
          Cart Detail
        </MenuItem>
      </Menu>
    </div>
  );
};

const columnsListCart = (
  setModalProduct: React.Dispatch<React.SetStateAction<IModalProduct>>
): GridColDef[] => {
  const renderSkeletonCell = (params: any, content: React.ReactNode) =>
    params.row.isSkeleton ? (
      <Skeleton variant="text" width={180} height={45} />
    ) : (
      content
    );

  return [
    {
      field: "id",
      headerName: "ID",
      minWidth: 300,
      flex: 2.5,
      sortable: false,
      renderCell: (params) => renderSkeletonCell(params, params.value),
    },
    {
      field: "userId",
      headerName: "User ID",
      minWidth: 200,
      flex: 2,
      sortable: true,
      renderCell: (params) => renderSkeletonCell(params, params.value),
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 100,
      flex: 0.5,
      sortable: false,
      type: "string",
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        renderSkeletonCell(
          params,
          <ActionMenu row={params.row} setModalProduct={setModalProduct} />
        ),
    },
  ];
};

export default columnsListCart;
