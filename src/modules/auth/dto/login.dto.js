import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDto {
	static schema = Joi.object({
		email: Joi.string().email().min(5).max(30).lowercase().required(),
		password: Joi.string()
			.min(8)
			.max(100)
			.required()
			.message("Password must contain 8 chars minimum"),
	});
}

export default LoginDto;
