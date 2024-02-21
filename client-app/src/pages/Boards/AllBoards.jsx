import { Container, Box } from "@mui/material";
import theme from "~/theme";
import LeftMenu from "~/components/AllBoards/LeftMenu";
import AllBoardsContent from "./AllBoardsContent/AllBoardsContent";

export default function AllBoards() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        paddingTop: "30px",
        height: `calc(100vh - ${theme.customVars.appBarHeight})`,
        backgroundColor: (theme) => {
          return theme.palette.mode === "dark" ? "#2c3e50" : "#fff";
        },
      }}
    >
      <Container
        sx={{
          maxWidth: "80vw",
          minWidth: "60vw",
          margin: "auto",
          display: "flex",
          backgroundColor: (theme) => {
            return theme.palette.mode === "dark" ? "#2c3e50" : "#fff";
          },
        }}
      >
        <LeftMenu />
        <AllBoardsContent />
      </Container>
    </Container>
  );
}
