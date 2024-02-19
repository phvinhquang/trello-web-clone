import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import backgroundImage from "../../../../assets/background.png";

export default function BoardsList() {
  //Fetch all board to have title data

  return (
    <Box sx={{ pl: 1 }}>
      {/* Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PersonOutlineIcon />
        <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
          Your Boards
        </Typography>
      </Box>

      {/* List of boards */}
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Card
          sx={{
            width: "190px",
            height: "100px",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            ":hover": {
              cursor: "pointer",
              opacity: 0.8,
            },
          }}
        >
          {/* <CardMedia
            component="img"
            height="100%"
            image={backgroundImage}
            sx={{ filter: "brightness(50%)", opacity: 0.7, zIndex: 1 }}
          /> */}
          <CardContent sx={{ paddingY: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.2em",
                fontWeight: "bold",
                textAlign: "left",
                paddingY: 1,
                color: "white",
                letterSpacing: 1,
              }}
            >
              Board Title
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: "190px",
            height: "100px",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            ":hover": {
              cursor: "pointer",
              opacity: 0.8,
            },
          }}
        >
          {/* <CardMedia
            component="img"
            height="100%"
            image={backgroundImage}
            sx={{ filter: "brightness(50%)", opacity: 0.7, zIndex: 1 }}
          /> */}
          <CardContent sx={{ paddingY: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.2em",
                fontWeight: "bold",
                textAlign: "left",
                paddingY: 1,
                color: "white",
                letterSpacing: 1,
              }}
            >
              Board Title
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
