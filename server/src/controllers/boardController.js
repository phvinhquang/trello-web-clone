import ApiError from "../utils/ApiError.js";
import { boardService } from "../services/boardService.js";

const createNew = async (req, res, next) => {
  try {
    const board = await boardService.createNew(req.body);

    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const board = await boardService.getDetails(boardId);

    res.status(200).json(board);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const boardController = {
  createNew,
  getDetails,
};
