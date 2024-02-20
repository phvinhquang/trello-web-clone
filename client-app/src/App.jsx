import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root/RootLayout";
import AllBoards from "./pages/Boards/AllBoards";
import Board from "~/pages/Boards/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <AllBoards />,
      },
      { path: "b/:boardId/:slug", element: <Board /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
