import axios from "axios";
import { API_URL } from "~/utils/constants";

export const fetchBoardDetailsAPI = async function (boardId) {
  const res = await axios.get(`${API_URL}v1/boards/` + boardId);
  return res.data;
};

export const updateBoardDetailsAPI = async function (boardId, updatedData) {
  const res = await axios.put(`${API_URL}v1/boards/` + boardId, updatedData);
  return res.data;
};

export const moveCardToDiffColumnAPI = async function (updatedData) {
  const res = await axios.put(
    `${API_URL}v1/boards/supports/moving-card`,
    updatedData
  );
  return res.data;
};

export const updateCardInColumnAPI = async function (columnId, updatedData) {
  const res = await axios.put(`${API_URL}v1/columns/` + columnId, updatedData);
  return res.data;
};

export const createNewColumnAPI = async function (columnData) {
  const res = await axios.post(`${API_URL}v1/columns/`, columnData);
  return res.data;
};

export const createNewCardAPI = async function (cardData) {
  const res = await axios.post(`${API_URL}v1/cards/`, cardData);
  return res.data;
};
