import { columnModel } from "../models/columnModel.js";
import { boardModel } from "../models/boardModel.js";
import { cardModel } from "../models/cardModel.js";
import ApiError from "../utils/ApiError.js";
// import ApiError from "../utils/ApiError.js";
// import cloneDeep from "lodash/cloneDeep.js";

const createNew = async (reqBody) => {
  try {
    const column = {
      ...reqBody,
    };

    // Tạo column mới
    const newColumn = await columnModel.createNew(column);

    // Dữ liệu đầy đủ để trả về FE
    const columnInDb = await columnModel.findById(newColumn.insertedId);

    // Thêm columnId mới được tạo vào boardOrderIds tương ứng
    if (!columnInDb) return;
    // Thêm dữ liệu trả về cho FE
    columnInDb.cards = [];

    await boardModel.pushColumnOrderIds(columnInDb);

    return columnInDb;
  } catch (err) {
    throw err;
  }
};

const update = async (columnId, reqBody) => {
  try {
    const updatedData = {
      ...reqBody,
      updatedAt: Date.now(),
    };

    const updatedColumn = await columnModel.update(columnId, updatedData);

    return updatedColumn;
  } catch (err) {
    throw err;
  }
};

const deleteItem = async (columnId) => {
  try {
    // Tìm column bị xóa
    const column = await columnModel.findById(columnId);
    if (!column) throw new ApiError(404, "Can not find that column");

    // Xóa column
    await columnModel.deleteOneById(columnId);

    // Xóa card thuộc column
    await cardModel.deleteCardsByColumn(columnId);

    // Xóa columnId trong columnOrderIds của Board
    await boardModel.pullColumnOrderIds(column);

    return { result: "Delete successfully !" };
  } catch (err) {
    throw err;
  }
};

export const columnService = {
  createNew,
  update,
  deleteItem,
};
