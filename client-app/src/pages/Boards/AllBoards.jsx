import { Container } from "@mui/material";
import LeftMenu from "~/components/AllBoards/LeftMenu";

export default function AllBoards() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ maxWidth: "1300px", backgroundColor: "white", display: "flex" }}
    >
      <LeftMenu />
      <p>Boards</p>
    </Container>
  );
}
