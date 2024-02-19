import { Container, Box } from "@mui/material";
import LeftMenu from "~/components/AllBoards/LeftMenu";
import AllBoardsContent from "./AllBoardsContent/AllBoardsContent";

export default function AllBoards() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        paddingTop: "30px",
        backgroundColor: (theme) => {
          return theme.palette.mode === "dark" ? "#2c3e50" : "#fff";
        },
      }}
    >
      <Container
        sx={{
          maxWidth: "1300px",
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
