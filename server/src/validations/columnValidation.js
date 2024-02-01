import Joi from "joi";
import ApiError from "../utils/ApiError.js";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "../utils/validators.js";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
  });

  try {
    console.log(req.body);
    // abortEarly: false để thông báo tất cả các lỗi (không chỉ lỗi đầu tiên)
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (err) {
    console.log(err);
    const error = new ApiError(422, err.message);
    next(error);
  }
};

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    boardId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),
  });

  try {
    await correctCondition.validateAsync(req.body, {
      // allowUnknown để cho phép không đẩy lên 1 số field
      abortEarly: false,
      allowUnknown: true,
    });

    next();
  } catch (err) {
    const error = new ApiError(422, err.message);
    next(error);
  }
};

export const columnValidation = {
  createNew,
  update,
};
