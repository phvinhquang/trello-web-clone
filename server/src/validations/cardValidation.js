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
    columnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
  });

  try {
    // abortEarly: false để thông báo tất cả các lỗi (không chỉ lỗi đầu tiên)
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (err) {
    const error = new ApiError(422, err.message);
    next(error);
  }
};

export const cardValidation = {
  createNew,
};
