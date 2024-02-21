// Import Components from MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Import Icons from MUI
import CloseIcon from "@mui/icons-material/Close";

import backgroundImage from "../../../assets/background.png";
import boardPlaceholder from "../../../assets/create-board.svg";
import { boardsActions } from "~/redux/boards-slice";
import { useDispatch } from "react-redux";
import { createNewBoardAPI } from "~/apis/http";
import { useState } from "react";

export default function AddNewBoard({ onClose }) {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardDesc, setNewBoardDesc] = useState("");
  const [titleInputError, setTitleInputError] = useState(false);
  const [descInputError, setDescInputError] = useState(false);
  const [visibility, setVisibility] = useState("Public");
  const dispatch = useDispatch();

  // Blur on inputs
  const titleInputBlurHandler = function () {
    if (newBoardTitle.trim() === "") setTitleInputError(true);
  };

  const descInputBlurHandler = function () {
    if (newBoardDesc.trim() === "") setDescInputError(true);
  };

  // Handle visibility change
  const handleChange = (event) => {
    setVisibility(event.target.value);
  };

  // Create new board handler
  const createNewBoardHandler = function () {
    if (newBoardTitle.trim() === "" || newBoardDesc.trim() === "") return;

    const newBoard = {
      title: newBoardTitle,
      description: newBoardDesc,
      type: visibility.toLowerCase(),
    };

    console.log(newBoard);
    // API call
    createNewBoardAPI(newBoard)
      .then((res) => {
        if (res.status === 201) {
          dispatch(boardsActions.addBoard(res.data));
        }
      })
      .catch((err) => console.log(err));
  };

  // Button disable condition
  const isDisable = newBoardDesc.trim() === "" || newBoardTitle.trim() === "";

  return (
    <Box>
      {/* Title and close button */}
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "14px", fontWeight: 500, ml: "30%" }}
        >
          Add new board
        </Typography>
        <CloseIcon
          onClick={onClose}
          sx={{
            fontSize: "medium",
            ":hover": {
              cursor: "pointer",
              backgroundColor: "#bbb",
              borderRadius: "2px",
            },
          }}
        />
      </Box>

      {/* Header */}
      <Box sx={{ mt: 1, mb: 2, display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: "200px",
            height: "120px",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            opacity: 0.8,
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={boardPlaceholder}
            sx={{ opacity: 1, padding: 1 }}
          />
        </Card>
      </Box>

      {/* Board Name Input */}
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 500, textAlign: "left" }}
        >
          Board's Title (required)
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          size="small"
          value={newBoardTitle}
          required
          onChange={(e) => {
            setTitleInputError(false);
            setNewBoardTitle(e.target.value);
          }}
          onBlur={titleInputBlurHandler}
          error={titleInputError}
          sx={{
            width: "100%",
            ".MuiInputBase-inputSizeSmall": {
              padding: "5px 8px",
            },
          }}
        />
      </Box>

      {/* Board Description Input */}
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 500, textAlign: "left" }}
        >
          Board's Description (required)
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          size="small"
          value={newBoardDesc}
          required
          onChange={(e) => {
            setDescInputError(false);
            setNewBoardDesc(e.target.value);
          }}
          onBlur={descInputBlurHandler}
          error={descInputError}
          sx={{
            width: "100%",
            ".MuiInputBase-inputSizeSmall": {
              padding: "5px 8px",
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 500, textAlign: "left" }}
        >
          Visibility (required)
        </Typography>
        <FormControl size="small" sx={{ width: "100%" }}>
          <Select value={visibility} onChange={handleChange} displayEmpty>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Action */}
      <Button
        variant="contained"
        onClick={createNewBoardHandler}
        disabled={isDisable}
        disableElevation
        sx={{ width: "100%", mb: 2 }}
      >
        Create Board
      </Button>
    </Box>
  );
}
