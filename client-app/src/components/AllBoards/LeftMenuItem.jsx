import TrelloIcon from "~/assets/trello.svg?react";

// Import Components from MUI
import Box from "@mui/material/Box";
import { SvgIcon } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function LeftMenuItem({
  title,
  svg,
  icon,
  fontWeightLight,
  morePadding,
}) {
  return (
    <Box
      sx={{
        // width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        textAlign: "left",
        paddingLeft: `${morePadding ? "40px" : "15px"}`,
        paddingY: "5px",
        ":hover": {
          cursor: "pointer",
          backgroundColor: "#bbb",
          borderRadius: "5px",
        },
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
          fontWeight: `${fontWeightLight ? 400 : 500}`,
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
