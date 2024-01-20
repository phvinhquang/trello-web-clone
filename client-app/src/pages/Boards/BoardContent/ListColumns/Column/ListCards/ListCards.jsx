// Components from MUI
import { Box } from "@mui/material";
import CardItem from "./Card/CardItem";

const ListCards = function () {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: "0 5px",
        margin: "0 5px",
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.customVars.boardContentHeight} - ${theme.spacing(
            5
          )} - ${theme.customVars.columnHeaderHeight} - ${
            theme.customVars.columnFooterHeight
          })`,
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#ced0da",
          borderRadius: "8px",
        },
        /* Handle on hover */
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#bfc2cf",
        },
      }}
    >
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
    </Box>
  );
};

export default ListCards;
