import Box from "@mui/material/Box";

import AllBoardsHeader from "~/components/AllBoards/AllBoardsHeader";
import BoardsList from "./BoardsList/BoardsList";

import { fetchAllBoardsAPI } from "~/apis/http";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardsActions } from "~/redux/boards-slice";

export default function AllBoardsContent() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  useEffect(() => {
    fetchAllBoardsAPI()
      .then((data) => {
        dispatch(boardsActions.update(data.boards));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ flex: 1, ml: 3 }}>
      <AllBoardsHeader />;
      <BoardsList boards={boards} />
    </Box>
  );
}
