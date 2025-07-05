export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: "#1976d2" },
          background: { default: "#fff", paper: "#f5f5f5" },
        }
      : {
          // palette values for dark mode
          primary: { main: "#90caf9" },
          background: { default: "#121212", paper: "#1d1d1d" },
        }),
  },
});
