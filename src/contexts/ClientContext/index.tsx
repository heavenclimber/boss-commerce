"use client";

import React from "react";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { store } from "@/store";
import { CustomThemeProvider, SnackbarProvider } from "@/contexts";
import { Sidebar, Navbar } from "@/components/layouts";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in"; // add more if needed
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <SnackbarProvider>
          {isAuthPage ? (
            <div className="min-h-screen flex items-center justify-center">
              {children}
            </div>
          ) : (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-4 flex-1 overflow-auto">{children}</main>
              </div>
            </div>
          )}
        </SnackbarProvider>
      </CustomThemeProvider>
    </Provider>
  );
}
