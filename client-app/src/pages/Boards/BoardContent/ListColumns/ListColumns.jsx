import { useState } from "react";
import Column from "./Column/Column";

// Import Componets from MUI
import { Box, Button } from "@mui/material";

import NoteAddIcon from "@mui/icons-material/NoteAdd";

const ListColumns = function () {
  return (
    <Box
      sx={{
        paddingTop: "10px",

        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        backgroundColor: "inherit",
        width: "100%",
        height: "100%",
        "&::-webkit-scrollbar-track": {
          margin: 2,
        },
      }}
    >
      {/* Column 1 */}
      <Column />
      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          marginX: 2,
          borderRadius: "6px",
          height: "fit-content",
          backgroundColor: "#ffffff3d",
        }}
      >
        <Button
          sx={{
            color: "white",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 2.5,
            paddingY: 1,
          }}
          startIcon={<NoteAddIcon />}
        >
          Add New Column
        </Button>
      </Box>
    </Box>
  );
};

export default ListColumns;
