import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "../utils/validators.js";
import { GET_DB } from "../config/mongodb.js";
import mongodb from "mongodb";
import { columnModel } from "./columnModel.js";
import { cardModel } from "./cardModel.js";

const BOARD_COLLECTION_NAME = "boards";
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(250).trim().strict(),
  type: Joi.string().valid("public", "private").default("public"),
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp("javascript").default(Date.now()),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

// Validate 2 lần ở route và model để tránh trường hợp
// trong controller hoặc service code lỗi khiến data bị
// mutate thành không hợp lệ nhưng vẫn pass
const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Tạo board mới
const createNew = async (data) => {
  try {
    const db = GET_DB();

    const validatedData = await validateBeforeCreate(data);
    const board = await db
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validatedData);
    return board;
  } catch (err) {
    throw new Error(err);
  }
};

// Tìm board theo id
const findById = async (id) => {
  try {
    const db = GET_DB();

    const board = await db
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new mongodb.ObjectId(id) });

    return board;
  } catch (err) {
    throw new Error(err);
  }
};

// Hàm riêng để get detail vì còn phải lấy data column và card
const getDetails = async (boardId) => {
  try {
    const db = GET_DB();

    const result = await db
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        // Tìm board
        { $match: { _id: new mongodb.ObjectId(boardId), _destroy: false } },
        // Tìm column của board
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        // Tìm card của board
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    return result[0] || {};
  } catch (err) {
    throw new Error(err);
  }
};

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findById,
  getDetails,
};
