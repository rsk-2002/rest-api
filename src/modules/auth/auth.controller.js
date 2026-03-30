import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.service.js";

const register = async (req, res) => {
	const user = await authService.register(req.body);
	ApiResponse.created(res, "Registration success", user);
};

const login = async (req, res) => {
	const { user, accessToken, refreshToken } = await authService.login(
		req.body,
	);

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: true,
		maxAge: 5 * 60 * 1000, // 5m
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: true,
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
	});

	ApiResponse.ok(res, "Login successful", {
		user,
		accessToken,
		refreshToken,
	});
};

const logout = async (req, res) => {
	await authService.logout(req.user.id);
	res.clearCookie("refreshToken");
	res.clearCookie("accessToken");
	ApiResponse.ok(res, "Logout successful");
};

const verifyEmail = async (req, res) => {
	const token = req.params.token;
	if (!token) throw ApiError.badRequest("token missing");
	const user = await authService.verifyEmail(token);
	ApiResponse.ok(res, "Email verified", user);
};

const getMe = async (req, res) => {
	const user = await authService.getMe(req.user.id);
	ApiResponse.ok(res, "User profile", user);
};

export { register, login, logout, verifyEmail, getMe };
