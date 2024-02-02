import ApiError from "../utils/ApiError.js";
import { columnService } from "../services/columnService.js";

const createNew = async (req, res, next) => {
  try {
    const column = await columnService.createNew(req.body);

    res.status(201).json(column);
  } catch (err) {
    next(err);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const column = await columnService.getDetails(columnId);

    res.status(200).json(column);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const updatedColumn = await columnService.update(columnId, req.body);

    res.status(201).json(updatedColumn);
  } catch (err) {
    next(err);
  }
};

export const columnController = {
  createNew,
  getDetails,
  update,
};
