"use client";

import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: (row: any) => string | number;
}

export default function Table({
  rows,
  columns,
  loading = false,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 5,
  getRowId,
}: TableProps) {
  return (
    <div className="w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        pageSizeOptions={pageSizeOptions}
        initialState={{
          pagination: {
            paginationModel: { pageSize: defaultPageSize, page: 0 },
          },
        }}
        getRowId={getRowId}
      />
    </div>
  );
}
