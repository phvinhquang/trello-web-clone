import ApiError from "../utils/ApiError.js";
import { cardService } from "../services/cardService.js";

const createNew = async (req, res, next) => {
  try {
    const card = await cardService.createNew(req.body);

    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const cardId = req.params.id;

    const card = await cardService.getDetails(cardId);

    res.status(200).json(card);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const cardController = {
  createNew,
  getDetails,
};
