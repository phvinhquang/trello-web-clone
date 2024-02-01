import { slugify } from "../utils/formatter.js";
import { boardModel } from "../models/boardModel.js";
import ApiError from "../utils/ApiError.js";
import cloneDeep from "lodash/cloneDeep.js";

const createNew = async (reqBody) => {
  try {
    const board = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    // Tạo board mới
    const newBoard = await boardModel.createNew(board);

    // Dữ liệu đầy đủ để trả về FE
    const response = await boardModel.findById(newBoard.insertedId);
    console.log(response);

    return response;
  } catch (err) {
    throw err;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) throw new ApiError(404, "Could not find board's details");

    // Dữ liệu trả về
    const response = cloneDeep(board);
    response.columns.forEach((column) => {
      column.cards = response.cards.filter(
        (card) =>
          // console.log(card)
          card.columnId.toString() === column._id.toString()
      );
    });

    return response;
  } catch (err) {
    throw err;
  }
};

const update = async (boardId, reqBody) => {
  try {
    const updatedData = {
      ...reqBody,
      updatedAt: Date.now(),
    };

    const updatedBoard = await boardModel.update(boardId, updatedData);

    return updatedBoard;
  } catch (err) {
    throw err;
  }
};

export const boardService = {
  createNew,
  getDetails,
  update,
};
