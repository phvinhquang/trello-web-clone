import ListColumns from "./ListColumns/ListColumns";

// Import Components from MUI
import { Box } from "@mui/material";

const BoardContent = function () {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        paddingBottom: "5px",
        width: "100%",
        height: (theme) => theme.customVars.boardContentHeight,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <ListColumns />
    </Box>
  );
};

export default BoardContent;
