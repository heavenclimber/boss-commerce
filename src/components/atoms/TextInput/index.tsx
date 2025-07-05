"use client";

import React from "react";
import { TextField, InputAdornment, TextFieldProps } from "@mui/material";

type TextInputProps = {
  label?: string;
  disableLabel?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
} & Omit<
  TextFieldProps,
  "variant" | "label" | "onChange" | "value" | "disabled" | "placeholder"
>;

const TextInput: React.FC<TextInputProps> = ({
  label = "",
  disableLabel = false,
  placeholder = "",
  value,
  onChange,
  disabled,
  startAdornment,
  ...rest
}) => {
  return (
    <>
      {label && <div className="mb-2 text-sm">{label}</div>}
      <TextField
        label={disableLabel ? "" : label}
        className="custom-textfield w-full"
        placeholder={placeholder}
        disabled={disabled}
        size="small"
        value={value}
        onChange={onChange}
        sx={{
          ".MuiOutlinedInput-root": {
            height: "40px",
          },
          ".MuiAutocomplete-input": {
            padding: "8px",
          },
        }}
        InputProps={{
          sx: {
            fontSize: "0.75rem",
          },
          startAdornment: startAdornment ? (
            <InputAdornment
              position="start"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "0.75rem !important",
                  color: "#303435",
                },
              }}
            >
              {startAdornment}
            </InputAdornment>
          ) : undefined,
        }}
        {...rest}
      />
    </>
  );
};

export default TextInput;
