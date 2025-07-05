// constants/sidebarMenu.ts

import { Home, ShoppingCart } from "@mui/icons-material";

export const sidebarMenu = [
  {
    label: "Home",
    path: "/",
    icon: <Home fontSize="small" />,
  },
  {
    label: "Cart",
    path: "/cart",
    icon: <ShoppingCart fontSize="small" />,
  },
];
