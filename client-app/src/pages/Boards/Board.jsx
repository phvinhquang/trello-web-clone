import { Container } from "@mui/material";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI } from "~/apis/http";

const Board = function () {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65b8bbadbd99c5a75fcdf35d";
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        setBoard(board);
      })
      .catch((err) => {});
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
};

export default Board;
