import React from "react";
import theme from "~/theme";

// Import Components form MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";

// Import Icons
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ModeSelect = function ({ homePage }) {
  const { mode, setMode } = useColorScheme();

  const handleSelect = (e) => {
    setMode(e.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          color: (theme) => {
            return `${
              homePage && theme.palette.mode === "light" ? "#42526E" : "white"
            }`;
          },
          "&.Mui-focused": {
            color: (theme) => {
              return `${
                homePage && theme.palette.mode === "light" ? "#42526E" : "white"
              }`;
            },
          },
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        sx={{
          color: (theme) => {
            return `${
              homePage && theme.palette.mode === "light" ? "#42526E" : "white"
            }`;
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) => {
              return `${
                homePage && theme.palette.mode === "light" ? "#42526E" : "white"
              }`;
            },
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) => {
              return `${
                homePage && theme.palette.mode === "light" ? "#42526E" : "white"
              }`;
            },
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) => {
              return `${
                homePage && theme.palette.mode === "light" ? "#42526E" : "white"
              }`;
            },
          },
          ".MuiSvgIcon-root": {
            color: (theme) => {
              return `${
                homePage && theme.palette.mode === "light" ? "#42526E" : "white"
              }`;
            },
          },
        }}
        onChange={handleSelect}
      >
        <MenuItem value="light">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <LightModeIcon fontSize="small" /> Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeIcon fontSize="small" /> Dark
          </div>
        </MenuItem>
        <MenuItem value="system">
          <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsSystemDaydreamIcon fontSize="small" /> System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default ModeSelect;
