import theme from "../../../theme";
import { Box } from "@mui/material";

const BoardContent = function () {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        height: `calc(100vh - ${theme.customVars.appBarHeight} - ${theme.customVars.boardBarHeight})`,
        display: "flex",
        alignItems: "center",
      }}
    >
      Boart Content
    </Box>
  );
};

export default BoardContent;
