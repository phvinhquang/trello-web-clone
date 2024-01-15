import theme from "~/theme";
import { Box } from "@mui/material";

const BoardBar = function () {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: "100%",
        height: theme.customVars.boardBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      Board Bar
    </Box>
  );
};

export default BoardBar;
