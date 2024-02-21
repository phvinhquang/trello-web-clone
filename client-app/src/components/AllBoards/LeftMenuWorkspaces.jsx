import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LeftMenuItem from "./LeftMenuItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";

export default function LeftMenuWorkspaces() {
  const [showMenu, setShowMenu] = useState(true);

  const handleClick = (event) => {
    setShowMenu((prev) => !prev);
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography
        sx={{
          paddingY: 1,
          paddingLeft: "10px",
          fontSize: "16px",
          fontWeight: 500,
          color: (theme) => {
            return `${theme.palette.mode === "light" ? "#42526E" : "white"}`;
          },
        }}
      >
        Workspace
      </Typography>
      <Button
        onClick={handleClick}
        endIcon={showMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          color: (theme) => {
            return `${theme.palette.mode === "light" ? "#42526E" : "white"}`;
          },
          ":hover": {
            cursor: "pointer",
            backgroundColor: "#ddd",
            borderRadius: "5px",
          },
        }}
      >
        Your Workspaces
      </Button>
      {showMenu && (
        <>
          <LeftMenuItem
            title="Boards"
            svg={true}
            fontWeightLight={true}
            morePadding={true}
          />
          <LeftMenuItem
            title="Highlights"
            icon={<FavoriteBorderIcon sx={{ fontSize: "medium" }} />}
            fontWeightLight={true}
            morePadding={true}
          />
          <LeftMenuItem
            title="Views"
            icon={<GridViewIcon sx={{ fontSize: "medium" }} />}
            fontWeightLight={true}
            morePadding={true}
          />
          <LeftMenuItem
            title="Members"
            icon={<PersonAddAltIcon sx={{ fontSize: "medium" }} />}
            fontWeightLight={true}
            morePadding={true}
          />
          <LeftMenuItem
            title="Settings"
            icon={<SettingsIcon sx={{ fontSize: "medium" }} />}
            fontWeightLight={true}
            morePadding={true}
          />
        </>
      )}
    </Box>
  );
}
