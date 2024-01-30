import axios from "axios";
import { API_URL } from "~/utils/constants";

export const fetchBoardDetailsAPI = async function (boardId) {
  const res = await axios.get(`${API_URL}v1/board/` + boardId);
  return res.data;
};
