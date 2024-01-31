import { cardModel } from "../models/cardModel.js";
import { columnModel } from "../models/columnModel.js";

const createNew = async (reqBody) => {
  try {
    const card = {
      ...reqBody,
    };

    // Tạo card mới
    const newCard = await cardModel.createNew(card);

    // Dữ liệu đầy đủ để trả về FE
    const cardInDb = await cardModel.findById(newCard.insertedId);
    if (!cardInDb) return;
    // Thêm cardId vào cardOrderIds
    await columnModel.pushCardOrderIds(cardInDb);

    return cardInDb;
  } catch (err) {
    throw err;
  }
};

// const getDetails = async (boardId) => {
//   try {
//     const board = await boardModel.getDetails(boardId);
//     if (!board) throw new ApiError(404, "Could not find board's details");

//     // Dữ liệu trả về
//     const response = cloneDeep(board);
//     response.columns.forEach((column) => {
//       column.cards = response.cards.filter(
//         (card) =>
//           // console.log(card)
//           card.columnId.toString() === column._id.toString()
//       );
//     });

//     return response;
//   } catch (err) {
//     throw err;
//   }
// };

export const cardService = {
  createNew,
  //   getDetails,
};
