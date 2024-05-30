import { z } from "zod";

export const EmailSchema = z.string().email("Invalid email address.");

export const UserNameSchema = z
	.string()
	.min(3, "Username must be at least 3 characters.")
	.max(20, "Username must be at most 10 characters.")
	.regex(
		/^[a-zA-Z0-9_]+$/,
		"Username must only contain letters, numbers and underscore.",
	);

export const PasswordSchema = z
	.string()
	.min(6, "Password must be at least 6 characters.")
	.max(20, "Password must be at most 20 characters.")
	.regex(
		/^[a-zA-Z0-9_]+$/,
		"Password must only contain letters, numbers and underscore.",
	);
