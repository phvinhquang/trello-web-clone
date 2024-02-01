import Joi from "joi";
import ApiError from "../utils/ApiError.js";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      // custom message của Joi rất cồng kềnh
      "any.required": `"a" should be a type of 'text'`,
      "string.empty": `"a" cannot be an empty field`,
      "string.min": `"a" should have a minimum length of {#limit}`,
      "any.required": `"a" is a required field`,
    }),
    description: Joi.string().required().min(3).max(250).trim().strict(),
    type: Joi.string().valid("public", "private"),
  });

  try {
    // abortEarly: false để thông báo tất cả các lỗi (không chỉ lỗi đầu tiên)
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (err) {
    // const errorDetails = err?.details?.map((d) => d.message);
    const error = new ApiError(422, err.message);
    next(error);
  }
};

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(250).trim().strict(),
    type: Joi.string().valid("public", "private"),
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

export const boardValidation = {
  createNew,
  update,
};
