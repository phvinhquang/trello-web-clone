import Joi from "joi";
import mongodb from "mongodb";
import { GET_DB } from "../config/mongodb.js";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "../utils/validators.js";

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = "cards";
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

const validateBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Tạo board mới
const createNew = async (data) => {
  try {
    const db = GET_DB();

    const validatedData = await validateBeforeCreate(data);
    // Convert boardId and columnId to ObjectId
    const dataToSave = {
      ...validatedData,
      boardId: new mongodb.ObjectId(validatedData.boardId),
      columnId: new mongodb.ObjectId(validatedData.columnId),
    };
    const card = await db
      .collection(CARD_COLLECTION_NAME)
      .insertOne(dataToSave);
    return card;
  } catch (err) {
    throw new Error(err);
  }
};

// Tìm board theo id
const findById = async (id) => {
  try {
    const db = GET_DB();

    const card = await db
      .collection(CARD_COLLECTION_NAME)
      .findOne({ _id: new mongodb.ObjectId(id) });

    return card;
  } catch (err) {
    throw new Error(err);
  }
};

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findById,
};
