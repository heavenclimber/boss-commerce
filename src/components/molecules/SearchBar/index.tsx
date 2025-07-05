import React from "react";
import { InputBase, Button, Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.css";

const SearchBar = ({
  searchBarValue = "",
  setSearchBarValue,
  handleSearchBar,
  handleChange,
  options,
  searchType = "",
  disabled = false,
}: {
  searchBarValue: string;
  setSearchBarValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearchBar: () => void;
  handleChange?: () => void;
  options: { id: string; label: string }[];
  searchType: string;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center">
      <div className="custom-input-container">
        <Autocomplete
          disabled={disabled}
          value={options.find((e: { label: string; id: string }) => {
            return e?.id === searchType;
          })}
          color="primary"
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              sx={{
                minWidth: "128px",
                "& .MuiOutlinedInput-root": {
                  height: "40px", // Adjust height
                  // border: '1px solid #D9E1E4', // Custom border color
                  borderTopRightRadius: "0px", // Top-right border radius
                  borderBottomRightRadius: "0px", // Bottom-right border radius
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D9E1E4", // Darker red on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D9E1E4", // Darker red on focus
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D9E1E4", // Default border color
                },
                "& .MuiAutocomplete-input": {
                  padding: "4px 8px", // Adjust inner padding
                },
              }}
              {...params}
              placeholder="Kolom"
            />
          )}
          // inputProps={{ 'aria-label': 'Without label' }}
          options={options}
        />

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          color="info"
          placeholder="Cari..."
          inputProps={{ "aria-label": "Cari..." }}
          onChange={(e) => {
            setSearchBarValue(e.target.value);
          }}
          value={searchBarValue}
        />
        <Button
          variant="contained"
          type="button"
          color="info"
          sx={{ p: "10px", height: "32px" }}
          aria-label="search"
          onClick={handleSearchBar}
        >
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
