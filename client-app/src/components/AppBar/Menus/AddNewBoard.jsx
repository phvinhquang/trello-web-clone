import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import CloseIcon from "@mui/icons-material/Close";

import backgroundImage from "../../../assets/background.png";
import boardPlaceholder from "../../../assets/create-board.svg";

export default function AddNewBoard({ onClose }) {
  return (
    <Box>
      {/* Title and close button */}
      <Box
        sx={{
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
          Board's Title
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          size="small"
          required
          error={true}
          sx={{
            width: "100%",
            ".MuiInputBase-inputSizeSmall": {
              padding: "5px 8px",
            },
          }}
        />
      </Box>

      {/* Action */}
      <Button variant="contained" disableElevation sx={{ width: "100%" }}>
        Create Board
      </Button>
    </Box>
  );
}
