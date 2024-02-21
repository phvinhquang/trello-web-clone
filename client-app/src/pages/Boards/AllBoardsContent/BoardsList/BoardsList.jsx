import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import backgroundImage from "../../../../assets/background.png";
import LoadingDots from "~/components/UI/LoadingDots";
import { Link } from "react-router-dom";

export default function BoardsList({ boards, isLoading }) {
  if (!boards || isLoading) {
    return <LoadingDots />;
  }

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
      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {boards?.map((board) => (
          <Link
            key={board._id}
            to={`/b/${board._id}/${board.slug}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                width: "220px",
                height: "120px",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                ":hover": {
                  cursor: "pointer",
                  opacity: 0.8,
                },
              }}
            >
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
                  {board.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* <Link style={{ textDecoration: "none" }}>
          <Card
            sx={{
              width: "220px",
              height: "120px",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              ":hover": {
                cursor: "pointer",
                opacity: 0.8,
              },
            }}
          >
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
                AA
              </Typography>
            </CardContent>
          </Card>
        </Link>

        <Link style={{ textDecoration: "none" }}>
          <Card
            sx={{
              width: "220px",
              height: "120px",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              ":hover": {
                cursor: "pointer",
                opacity: 0.8,
              },
            }}
          >
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
                AA
              </Typography>
            </CardContent>
          </Card>
        </Link> */}
      </Box>
    </Box>
  );
}
