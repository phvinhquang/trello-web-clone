import { WHITELIST_DOMAINS } from "../utils/constants.js";
import ApiError from "../utils/ApiError.js";

// Cấu hình CORS Option
export const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép việc gọi API bằng POSTMAN trên môi trường dev,
    // Thông thường khi sử dụng postman thì cái origin sẽ có giá trị là undefined
    if (process.env.BUILD_MODE === "dev") {
      return callback(null, true);
    }

    // Kiểm tra xem origin có phải là domain được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
    return callback(
      new ApiError(403, `${origin} not allowed by our CORS Policy.`)
    );
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS sẽ cho phép nhận cookies từ request,
  // Đính kèm jwt access token và refresh token vào httpOnly Cookies
  credentials: true,
};
