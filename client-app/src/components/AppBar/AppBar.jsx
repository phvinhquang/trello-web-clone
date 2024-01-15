import { Box } from "@mui/material";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import theme from "../../theme";

// Icon
import AppsIcon from "@mui/icons-material/Apps";
import TrelloIcon from "~/assets/trello.svg?react";
import { SvgIcon } from "@mui/material";
import Typography from "@mui/material/Typography";

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
      </Box>

      <Box>
        <ModeSelect />
      </Box>
    </Box>
  );
};

export default AppBar;
