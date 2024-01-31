import { useState } from "react";

import theme from "../../theme";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import TrelloIcon from "~/assets/trello.svg?react";
import Recents from "./Menus/Recents";
import Workspaces from "./Menus/Workspaces";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Profile from "./Menus/Profile";

// Import Components from MUI
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { SvgIcon } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

// Import Icons
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const AppBar = function () {
  const [searchValue, setSearchValue] = useState("");
  const [showSearchClose, setShowSearchClose] = useState(false);

  const textFieldBlurHandler = function () {
    if (searchValue !== "") return;
    setShowSearchClose(false);
  };

  return (
    <Box
      paddingX={2}
      sx={{
        // backgroundColor: "primary.light",
        width: "100%",
        height: theme.customVars.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        overflowX: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <AppsIcon
          sx={{
            color: "white",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{ color: "white", fontSize: "md" }}
          />
          <Typography
            variant="span"
            paddingTop="2px"
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            Trello
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Workspaces />
          <Recents />
          <Starred />
          <Templates />
          <Button
            sx={{
              color: "white",
              border: "none",
              "&:hover": {
                border: "none",
              },
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowSearchClose(true)}
          onBlur={textFieldBlurHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: showSearchClose && (
              <InputAdornment position="end">
                <CloseIcon
                  onClick={() => {
                    setShowSearchClose(false);
                    setSearchValue("");
                  }}
                  fontSize="small"
                  sx={{
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: 120,
            maxWidth: 180,
            "& label": { color: "white" },
            "& input": { color: "white" },
            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                outline: "none",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
                borderWidth: 1,
              },
            },
          }}
        />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon sx={{ color: "white" }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: "white" }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
};

export default AppBar;
