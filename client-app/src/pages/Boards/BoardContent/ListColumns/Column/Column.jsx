import { useState } from "react";
import { toast } from "react-toastify";
import ListCards from "./ListCards/ListCards";
import { useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Import Componets from MUI
import { Box, Typography, Tooltip, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Cloud from "@mui/icons-material/Cloud";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import TextField from "@mui/material/TextField";

// Import Icons from MUI
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import { useConfirm } from "material-ui-confirm";

const Column = function ({ column, onCreateCard, onDeleteColumn }) {
  // DndKit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: { ...column },
    animateLayoutChanges: () => false,
  });

  const dndKitColumnStyles = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  // Dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Data for card
  const orderedCards = column?.cards;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Add new Card
  const [showAddCardInput, setShowAddCardInput] = useState(false);
  const [cardInput, setCardInput] = useState("");

  // Ẩn/hiển input thêm card
  const toggleShowAddCardInput = function () {
    setShowAddCardInput((prev) => !prev);
  };

  // Xử lý sự kiện thêm card mới
  const addNewCardHandler = function () {
    if (!cardInput) {
      toast.error("Hãy nhập tên card để tiếp tục", {
        position: "bottom-right",
      });
      return;
    }

    const cardData = {
      title: cardInput,
      columnId: column._id,
    };

    //// API
    onCreateCard(cardData);

    // Clear input và đóng thẻ input
    setCardInput("");
    setShowAddCardInput(false);
  };

  // Xử lý sự kiện xóa Column (và Card bên trong)
  const confirmDeleteColumn = useConfirm();
  const deleteColumnHandler = function () {
    confirmDeleteColumn({
      title: "Delete Column ?",
      description: "Bạn có chắc muốn xóa hoàn toàn Cột và các Thẻ bên trong",
      confirmationText: "Đúng, xóa đi nào",
      cancellationText: "Thôi",

      dialogProps: { maxWidth: "xs" },
      confirmationButtonProps: { color: "error", variant: "outlined" },
      cancellationButtonProps: { color: "inherit" },
      allowClose: false,
      buttonOrder: ["confirm", "cancel"],
    })
      .then(() => {
        onDeleteColumn(column._id);
      })
      .catch((err) => {});
  };

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          marginLeft: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) => `${theme.customVars.boardContentHeight}`,
        }}
      >
        {/* Column Header */}
        <Box
          sx={{
            height: (theme) => theme.customVars.columnHeaderHeight,
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{
                  color: "text.primary",
                  cursor: "pointer",
                }}
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-workspaces"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem
                onClick={toggleShowAddCardInput}
                sx={{
                  "&:hover": {
                    color: "success.light",
                    "& .btn-icon-add": { color: "success.light" },
                  },
                }}
              >
                <ListItemIcon>
                  <AddCardIcon className="btn-icon-add" fontSize="small" />
                </ListItemIcon>
                <ListItemText disableTypography>Add new Card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={deleteColumnHandler}
                sx={{
                  "&:hover": {
                    color: "warning.dark",
                    "& .btn-icon-delete": { color: "warning.dark" },
                  },
                }}
              >
                <ListItemIcon>
                  <DeleteIcon className="btn-icon-delete" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archieve this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Cards List */}
        <ListCards cards={orderedCards} />

        {/* Column Footer */}
        <Box
          sx={{
            height: (theme) => theme.customVars.columnFooterHeight,
            padding: 2,
          }}
        >
          {!showAddCardInput && (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<AddCardIcon />}
                onClick={toggleShowAddCardInput}
              >
                Add New Card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: "pointer" }} />
              </Tooltip>
            </Box>
          )}
          {showAddCardInput && (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
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
                data-no-dnd="true"
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                // onBlur={textFieldBlurHandler}

                sx={{
                  "& label": { color: "text.primary" },
                  "& input": {
                    color: (theme) => theme.palette.primary.main,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#333643" : "white",
                  },
                  "& label.Mui-focused": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    borderRadius: 1,
                  },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={addNewCardHandler}
                  variant="contained"
                  color="success"
                  size="small"
                  data-no-dnd="true"
                  sx={{
                    paddingX: 1,
                    boxShadow: "none",
                    border: "0.5px solid",
                    borderColor: (theme) => theme.palette.success.main,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.success.main,
                    },
                    width: "max-content",
                  }}
                >
                  Add Card
                </Button>
                <CloseIcon
                  onClick={toggleShowAddCardInput}
                  fontSize="small"
                  sx={{
                    color: (theme) => theme.palette.error.light,
                    cursor: "pointer",
                    "&:hover": {
                      color: (theme) => theme.palette.warning.light,
                      cursor: "pointer ",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Column;
