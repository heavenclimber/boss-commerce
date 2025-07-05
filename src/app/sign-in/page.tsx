"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import LoginForm from "@/components/organisms/forms/LoginForm";

const SignInPage = () => {
  return (
    <Box maxWidth={400} mx="auto" mt={10} p={4} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={2}>
        Sign In
      </Typography>
      <LoginForm />
    </Box>
  );
};

export default SignInPage;
