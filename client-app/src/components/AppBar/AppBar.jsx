import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import Divider from "@mui/material/Divider";

// Import Icons
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const AppBar = function ({ homePage }) {
  const [searchValue, setSearchValue] = useState("");
  const [showSearchClose, setShowSearchClose] = useState(false);
  const navigate = useNavigate();

  const textFieldBlurHandler = function () {
    if (searchValue !== "") return;
    setShowSearchClose(false);
  };

  const appIconClick = function () {
    navigate("/");
  };

  return (
    <>
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
          backgroundColor: (theme) => {
            if (homePage) {
              return theme.palette.mode === "dark" ? "#2c3e50" : "#fff";
            }
            return theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0";
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <AppsIcon
            sx={{
              color: (theme) => {
                return `${
                  homePage && theme.palette.mode === "light"
                    ? "#42526E"
                    : "white"
                }`;
              },
            }}
          />
          <Box
            onClick={appIconClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              ":hover": { cursor: "pointer" },
            }}
          >
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              sx={{
                color: (theme) => {
                  return `${
                    homePage && theme.palette.mode === "light"
                      ? "#42526E"
                      : "white"
                  }`;
                },
                fontSize: "md",
              }}
            />
            <Typography
              variant="span"
              paddingTop="2px"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: (theme) => {
                  return `${
                    homePage && theme.palette.mode === "light"
                      ? "#42526E"
                      : "white"
                  }`;
                },
              }}
            >
              Trello
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Workspaces homePage={homePage} />
            <Recents homePage={homePage} />
            <Starred homePage={homePage} />
            <Templates homePage={homePage} />
            <Button
              sx={{
                color: (theme) => {
                  return `${
                    homePage && theme.palette.mode === "light"
                      ? "#42526E"
                      : "white"
                  }`;
                },
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
                  <SearchIcon
                    sx={{
                      color: (theme) => {
                        return `${
                          homePage && theme.palette.mode === "light"
                            ? "#42526E"
                            : "white"
                        }`;
                      },
                    }}
                  />
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
                      color: (theme) => {
                        return `${
                          homePage && theme.palette.mode === "light"
                            ? "#42526E"
                            : "white"
                        }`;
                      },
                      cursor: "pointer",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: 120,
              maxWidth: 180,
              "& label": {
                color: (theme) => {
                  return `${
                    homePage && theme.palette.mode === "light"
                      ? "#42526E"
                      : "white"
                  }`;
                },
              },
              "& input": {
                color: (theme) => {
                  return `${
                    homePage && theme.palette.mode === "light"
                      ? "#42526E"
                      : "white"
                  }`;
                },
              },
              "& label.Mui-focused": {
                color: (theme) => {
                  return `${
                    homePage && theme.palette.mode === "light"
                      ? "#42526E"
                      : "white"
                  }`;
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: (theme) => {
                    return `${
                      homePage && theme.palette.mode === "light"
                        ? "#42526E"
                        : "white"
                    }`;
                  },
                  outline: "none",
                },
                "&:hover fieldset": {
                  borderColor: (theme) => {
                    return `${
                      homePage && theme.palette.mode === "light"
                        ? "#42526E"
                        : "white"
                    }`;
                  },
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => {
                    return `${
                      homePage && theme.palette.mode === "light"
                        ? "#42526E"
                        : "white"
                    }`;
                  },
                  borderWidth: 1,
                },
              },
            }}
          />
          <ModeSelect homePage={homePage} />
          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsNoneIcon
                sx={{
                  color: (theme) => {
                    return `${
                      homePage && theme.palette.mode === "light"
                        ? "#42526E"
                        : "white"
                    }`;
                  },
                }}
              />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon
              sx={{
                color: (theme) => {
                  return `${
                    homePage && theme.palette.mode === "light"
                      ? "#42526E"
                      : "white"
                  }`;
                },
              }}
            />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default AppBar;
