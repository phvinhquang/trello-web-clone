import TrelloIcon from "~/assets/trello.svg?react";

// Import Components from MUI
import Box from "@mui/material/Box";
import { SvgIcon } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function LeftMenuItem({ title, svg, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        textAlign: "left",
        marginLeft: "15px",
      }}
    >
      {svg && (
        <SvgIcon
          component={TrelloIcon}
          inheritViewBox
          sx={{
            color: (theme) => {
              return `${theme.palette.mode === "light" ? "#42526E" : "white"}`;
            },
            fontSize: "medium",
          }}
        />
      )}
      {icon && icon}
      <Typography
        variant="span"
        paddingTop="2px"
        sx={{
          fontWeight: "bold",
          fontSize: "1rem",
          color: (theme) => {
            return `${theme.palette.mode === "light" ? "#42526E" : "white"}`;
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
