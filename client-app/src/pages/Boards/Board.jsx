import { Container } from "@mui/material";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
import { useEffect, useState } from "react";
import { mapOrder } from "~/utils/sortArray";
import { fetchBoardDetailsAPI, updateBoardDetailsAPI } from "~/apis/http";
import {
  createNewColumnAPI,
  createNewCardAPI,
  updateCardInColumnAPI,
  moveCardToDiffColumnAPI,
  deleteColumnAPI,
} from "~/apis/http";
import theme from "~/theme";
import { generatePlaceHolderCard } from "~/utils/helpers";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import LoadingDots from "~/components/UI/LoadingDots";
import { useParams } from "react-router-dom";

const Board = function () {
  const [board, setBoard] = useState(null);
  const params = useParams();

  useEffect(() => {
    // const boardId = "65b8bbadbd99c5a75fcdf35d";
    const boardId = params.boardId;
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        // Sắp xếp thứ tự column theo columnOrderIds trước khi truyền xuống component con
        board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

        // Nếu column rỗng thì thêm placeholder card vào để có thể kéo thả
        board.columns.forEach((c) => {
          if (isEmpty(c.cards)) {
            c.cards = [generatePlaceHolderCard(c)];
            c.cardOrderIds = [generatePlaceHolderCard(c)._id];
          } else {
            // Sắp xếp thứ tự card theo cardOrderIds trước khi truyền xuống component con
            c.cards = mapOrder(c.cards, c.cardOrderIds, "_id");
          }
        });

        setBoard(board);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

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

    // Gọi API
    const newCard = await createNewCardAPI(sentData);

    // Cập nhật lại state cho board
    setBoard((prev) => {
      const newBoard = { ...prev };

      const updatedColumn = newBoard.columns.find(
        (c) => c._id === newCard.columnId
      );
      if (!updatedColumn) return;

      // Khi add card vào column rỗng thì xóa placeholder card đi
      if (updatedColumn.cards.some((c) => c.FE_placeholderCard)) {
        updatedColumn.cards = [newCard];
        updatedColumn.cardOrderIds = [newCard._id];
      } else {
        updatedColumn.cards.push(newCard);
        updatedColumn.cardOrderIds.push(newCard._id);
      }

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

  // Cập nhật thứ tự card trong cùng column
  const updateCardOrderInSameColumn = async function (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) {
    // Cập nhật state cho board
    const newBoard = { ...board };
    const updatedColumn = newBoard.columns.find((c) => c._id === columnId);
    if (updatedColumn) {
      updatedColumn.cards = dndOrderedCards;
      updatedColumn.cardOrderIds = dndOrderedCardIds;
    }
    setBoard(newBoard);

    // Gọi API
    await updateCardInColumnAPI(columnId, {
      cardOrderIds: dndOrderedCardIds,
    });
  };

  // Update db khi chuyển card sang 1 column khác
  const updateCardToDiffColumn = function (
    currentCardId,
    prevColumnId,
    nextColumnId,
    newOrderedColumns
  ) {
    // console.log(currentCardId, prevColumnId, nextColumnId, newOrderedColumns);

    // Cập nhật lại state cho board
    const newOrderColumnsIds = newOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = newOrderedColumns;
    newBoard.columnOrderIds = newOrderColumnsIds;
    setBoard(newBoard);

    // Nếu sau khi kéo card, column chỉ còn placeholder card thì chỉ gửi lên mảng rỗng
    // Vì placeholder card sẽ không qua được validation
    let prevCardOrderIds = newOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }

    // Gọi API
    moveCardToDiffColumnAPI({
      currentCardId,
      prevColumnId,
      // Thứ tự card mới cho column cũ
      prevCardOrderIds: prevCardOrderIds,
      nextColumnId,
      // Thứ tự card mới cho column đích
      nextCardOrderIds: newOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  // Xử lý xóa Column
  const deleteColumnHandler = async function (columnId) {
    // Cập nhật cho state ở FE
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (id) => id !== columnId
    );
    setBoard(newBoard);

    // Gọi API
    const result = await deleteColumnAPI(columnId);
    toast.success(result?.result);
  };

  if (!board) {
    return (
      <div style={{ height: `calc(100vh - ${theme.customVars.appBarHeight})` }}>
        <LoadingDots />
        <p>
          Due to Render's free service, you might need to wait a few minutes for
          initial load, please be patient.
        </p>
      </div>
    );
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: `calc(100vh - ${theme.customVars.appBarHeight})` }}
    >
      {/* <AppBar /> */}
      <BoardBar board={board} />
      <BoardContent
        board={board}
        onCreateColumn={createNewColumnHandler}
        onCreateCard={createNewCardHandler}
        onUpdateColumnOrder={updateColumnOrderHandler}
        onUpdateCardInSameColumn={updateCardOrderInSameColumn}
        onUpdateCardToDiffColumn={updateCardToDiffColumn}
        onDeleteColumn={deleteColumnHandler}
      />
    </Container>
  );
};

export default Board;
