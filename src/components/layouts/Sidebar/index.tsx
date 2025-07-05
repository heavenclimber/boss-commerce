"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close,
  Brightness4,
  Brightness7,
  Logout,
} from "@mui/icons-material";
import { sidebarMenu } from "@/constants/sidebarMenu";
import { useThemeContext } from "@/contexts/ThemeContext";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUsername } from "@/store/userSlice";

const drawerWidth = 240;

export const Sidebar = () => {
  const { toggleColorMode, mode } = useThemeContext();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(setUsername(null));
    deleteCookie("token");
    router.push("/sign-in");
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <div
      className="flex flex-col justify-between h-full"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Top Section */}
      <div>
        <div className="px-4 py-6 text-xl font-bold">BOSS-Commerce</div>
        <Divider />
        <List>
          {sidebarMenu.map(({ label, path, icon }) => {
            const isActive = pathname === path;

            return (
              <ListItem
                button="true"
                key={path}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                component={Link as any}
                href={path}
                selected={isActive}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "#fff",
                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            );
          })}
        </List>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-center gap-3 p-4">
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <IconButton onClick={handleSignOut} color="error">
          <Logout fontSize="small" />
        </IconButton>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <div className="p-2 md:hidden">
          <IconButton onClick={handleDrawerToggle}>
            {mobileOpen ? <Close /> : <MenuIcon />}
          </IconButton>
        </div>
      )}

      {/* Drawer container */}
      <nav style={{ width: isMobile ? undefined : drawerWidth }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </nav>
    </>
  );
};
