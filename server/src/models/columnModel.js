import Joi from "joi";
import mongodb from "mongodb";
import { GET_DB } from "../config/mongodb.js";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "../utils/validators.js";

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = "columns";
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé, (lúc quay video số 57 mình quên nhưng sang đầu video số 58 sẽ có nhắc lại về cái này.)
  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

const validateBeforeCreate = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Tạo board mới
const createNew = async (data) => {
  try {
    const db = GET_DB();

    const validatedData = await validateBeforeCreate(data);
    // Convert boardId string to ObjectId
    const dataToSave = {
      ...validatedData,
      boardId: new mongodb.ObjectId(validatedData.boardId),
    };
    const column = await db
      .collection(COLUMN_COLLECTION_NAME)
      .insertOne(dataToSave);

    return column;
  } catch (err) {
    throw new Error(err);
  }
};

// Tìm board theo id
const findById = async (id) => {
  try {
    const db = GET_DB();

    const column = await db
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({ _id: new mongodb.ObjectId(id) });

    return column;
  } catch (err) {
    throw new Error(err);
  }
};

// Thêm cardId mới được tạo vào cardOrderIds
const pushCardOrderIds = async (card) => {
  try {
    const db = GET_DB();

    const result = await db.collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id: new mongodb.ObjectId(card.columnId) },
      {
        $push: {
          cardOrderIds: new mongodb.ObjectId(card._id),
        },
      },
      { returnDocument: "after" }
    );

    return result.value;
  } catch (err) {
    throw new Error(err);
  }
};

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findById,
  pushCardOrderIds,
};
