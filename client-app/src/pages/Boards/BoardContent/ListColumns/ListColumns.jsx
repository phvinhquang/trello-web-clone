import { useState } from "react";
import { toast } from "react-toastify";
import Column from "./Column/Column";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

// Import Componets from MUI
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CloseIcon from "@mui/icons-material/Close";

const ListColumns = function ({
  columns,
  onCreateColumn,
  onCreateCard,
  onDeleteColumn,
}) {
  const [showAddColumnInput, setShowAddColumnInput] = useState(false);
  const [columnInput, setColumnInput] = useState("");

  const toggleShowAddColumnInput = function () {
    setShowAddColumnInput((prev) => !prev);
  };

  const addNewColumnHandler = function () {
    // Báo lỗi nếu input rỗng
    if (!columnInput) {
      toast.error("Hãy nhập gì đó để tiếp tục");
      return;
    }
    //// API
    const columnData = {
      title: columnInput,
    };
    onCreateColumn(columnData);

    // Clear input và đóng thẻ input
    setColumnInput("");
    setShowAddColumnInput(false);
  };

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
          <Column
            onCreateCard={onCreateCard}
            onDeleteColumn={onDeleteColumn}
            key={i}
            column={column}
          />
        ))}

        {/* Add new Column Button */}
        {!showAddColumnInput && (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              marginX: 2,
              borderRadius: "6px",
              height: "fit-content",
              backgroundColor: "#ffffff3d",
            }}
            onClick={toggleShowAddColumnInput}
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
        )}
        {showAddColumnInput && (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              marginX: 2,
              padding: 1,
              borderRadius: "6px",
              height: "fit-content",
              backgroundColor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              // id="outlined-search"
              label="Enter Column Title ..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={columnInput}
              onChange={(e) => setColumnInput(e.target.value)}
              // onBlur={textFieldBlurHandler}

              sx={{
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                onClick={addNewColumnHandler}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  paddingX: 3,
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: "success.main",
                  //  (theme) => theme.palette.success.main
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.success.main,
                  },
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                onClick={toggleShowAddColumnInput}
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    color: (theme) => theme.palette.warning.light,
                  },
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
