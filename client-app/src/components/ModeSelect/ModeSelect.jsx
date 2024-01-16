import React, { useState } from "react";

// Import Components form MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

// Import Icons
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ModeSelect = function () {
  const { mode, setMode } = useColorScheme();

  const handleSelect = (e) => {
    setMode(e.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{ color: "white", "&.Mui-focused": { color: "white" } }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        sx={{
          color: "white",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          ".MuiSvgIcon-root": {
            color: "white",
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
