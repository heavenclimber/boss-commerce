"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AppBar, Toolbar } from "@mui/material";

export const Navbar = () => {
  const username = useSelector((state: RootState) => state.user.user?.username);

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-end">
        <div className="text-white text-base font-medium font-sans">
          {username ? `Hello, ${username}` : "Hello, Guest"}
        </div>
      </Toolbar>
    </AppBar>
  );
};
