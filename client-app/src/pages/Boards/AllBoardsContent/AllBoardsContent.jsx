import Box from "@mui/material/Box";

import AllBoardsHeader from "~/components/AllBoards/AllBoardsHeader";
import BoardsList from "./BoardsList/BoardsList";

export default function AllBoardsContent() {
  return (
    <Box sx={{ flex: 1, ml: 3 }}>
      <AllBoardsHeader />;
      <BoardsList />
    </Box>
  );
}
