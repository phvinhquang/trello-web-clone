import { Container } from "@mui/material";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI, updateBoardDetailsAPI } from "~/apis/http";
import { createNewColumnAPI, createNewCardAPI } from "~/apis/http";
import { generatePlaceHolderCard } from "~/utils/helpers";
import { isEmpty } from "lodash";

const Board = function () {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65b8bbadbd99c5a75fcdf35d";
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        // Nếu column rỗng thì thêm placeholder card vào để có thể kéo thả
        board.columns.forEach((c) => {
          if (isEmpty(c.cards)) {
            c.cards = [generatePlaceHolderCard(c)];
            c.cardOrderIds = [generatePlaceHolderCard(c)._id];
          }
        });
        setBoard(board);
      })
      .catch((err) => {});
  }, []);

  // Hàm gửi request tạo column mới
  const createNewColumnHandler = async function (columnData) {
    const sentData = {
      ...columnData,
      boardId: board._id,
    };

    const newColumn = await createNewColumnAPI(sentData);
    // Thêm placeholder card vào để có thể kéo thả
    newColumn.cards = [generatePlaceHolderCard(newColumn)];
    newColumn.cardOrderIds = [generatePlaceHolderCard(newColumn)._id];

    // Cập nhật lại state cho board
    setBoard((prev) => {
      const newBoard = { ...prev };
      newBoard.columns.push(newColumn);
      newBoard.columnOrderIds.push(newColumn._id);

      return newBoard;
    });
  };

  // Hàm gửi request tạo card mới
  const createNewCardHandler = async function (cardData) {
    const sentData = { ...cardData, boardId: board._id };
    console.log(sentData);
    const newCard = await createNewCardAPI(sentData);

    // Cập nhật lại state cho board
    setBoard((prev) => {
      const newBoard = { ...prev };

      const updatedColumn = newBoard.columns.find(
        (c) => c._id === newCard.columnId
      );
      if (!updatedColumn) return;

      updatedColumn.cards.push(newCard);
      updatedColumn.cardOrderIds.push(newCard._id);

      console.log(newBoard);

      // newBoard.columns = updatedColumn;
      return newBoard;
    });
  };

  // Cập nhật thứ tự column sau khi kéo thả
  const updateColumnOrderHandler = async function (newOrderColumns) {
    const newOrderColumnsIds = newOrderColumns.map((c) => c._id);

    // Cập nhật lại state cho board
    setBoard((prev) => {
      const newBoard = { ...prev };
      newBoard.columns = newOrderColumns;
      newBoard.columnOrderIds = newOrderColumnsIds;

      return newBoard;
    });

    // API update board
    await updateBoardDetailsAPI(board._id, {
      columnOrderIds: newOrderColumnsIds,
    });
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        onCreateColumn={createNewColumnHandler}
        onCreateCard={createNewCardHandler}
        onUpdateColumnOrder={updateColumnOrderHandler}
      />
    </Container>
  );
};

export default Board;
