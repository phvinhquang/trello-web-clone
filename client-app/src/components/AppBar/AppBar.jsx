import { Box } from "@mui/material";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import theme from "../../theme";

// Icon
import AppsIcon from "@mui/icons-material/Apps";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import TrelloIcon from "~/assets/trello.svg?react";
import Workspaces from "./Menus/Workspaces";
import Recents from "./Menus/Recents";
import Tooltip from "@mui/material/Tooltip";
import { SvgIcon } from "@mui/material";
import Typography from "@mui/material/Typography";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profile from "./Menus/Profile";

const AppBar = function () {
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
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <AppsIcon
          sx={{
            color: "primary.main",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{ color: "primary.main" }}
          />
          <Typography
            variant="span"
            paddingTop="2px"
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "primary.main",
            }}
          >
            Trello
          </Typography>
        </Box>

        <Workspaces />
        <Recents />
        <Starred />
        <Templates />
        <Button variant="outlined">Create</Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="search"
          size="small"
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
};

export default AppBar;
