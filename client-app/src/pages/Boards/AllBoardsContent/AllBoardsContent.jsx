import Box from "@mui/material/Box";

import AllBoardsHeader from "~/components/AllBoards/AllBoardsHeader";
import BoardsList from "./BoardsList/BoardsList";

import { fetchAllBoardsAPI } from "~/apis/http";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardsActions } from "~/redux/boards-slice";
import LoadingDots from "~/components/UI/LoadingDots";

export default function AllBoardsContent() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  // Fetch all boards
  useEffect(() => {
    setIsLoading(true);
    fetchAllBoardsAPI()
      .then((data) => {
        dispatch(boardsActions.update(data.boards));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ flex: 1, ml: 3 }}>
      <AllBoardsHeader />;
      <BoardsList boards={boards} isLoading={isLoading} />
    </Box>
  );
}
