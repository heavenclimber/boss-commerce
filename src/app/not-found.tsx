// app/not-found.tsx
"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for doesn’t exist.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Link>
    </Container>
  );
}
