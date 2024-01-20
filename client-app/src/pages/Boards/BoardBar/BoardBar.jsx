import theme from "~/theme";

// Import Components from MUI
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

// Import Icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const chipStyle = {
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  px: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

const BoardBar = function () {
  return (
    <Box
      px={2}
      sx={{
        backgroundColor: "white",
        width: "100%",
        height: theme.customVars.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        overflowX: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        // borderBottom: "1px solid #00bfa5",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Chip
          sx={chipStyle}
          icon={<DashboardIcon />}
          label="phvinhquang"
          clickable
        />
        <Chip
          sx={chipStyle}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={chipStyle}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip sx={chipStyle} icon={<BoltIcon />} label="Automation" clickable />
        <Chip
          sx={chipStyle}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" },
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={4}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": {
                backgroundColor: "#a4b0be",
              },
            },
          }}
        >
          <Tooltip title="smt">
            <Avatar
              alt="jeremypisces04@gmail.com"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="smt">
            <Avatar
              alt="jeremypisces04@gmail.com"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="smt">
            <Avatar
              alt="jeremypisces04@gmail.com"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="smt">
            <Avatar
              alt="jeremypisces04@gmail.com"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="smt">
            <Avatar
              alt="jeremypisces04@gmail.com"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="smt">
            <Avatar
              alt="jeremypisces04@gmail.com"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="smt">
            <Avatar
              alt="jeremypisces04@gmail.com"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
