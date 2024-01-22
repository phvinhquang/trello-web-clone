import { useState } from "react";
import Column from "./Column/Column";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

// Import Componets from MUI
import { Box, Button } from "@mui/material";

import NoteAddIcon from "@mui/icons-material/NoteAdd";

const ListColumns = function ({ columns }) {
  // items trong SortableContext yêu cầu 1 array gồm các primitive values
  // Nên thông thường map items ra để lấy chỉ id (hoặc giá trị tương tự id), không để cả object
  return (
    <SortableContext
      items={columns.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
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
        {/* Columns rendering */}
        {columns.map((column, i) => (
          <Column key={i} column={column} />
        ))}

        {/* Add new Column Button */}
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
    </SortableContext>
  );
};

export default ListColumns;
