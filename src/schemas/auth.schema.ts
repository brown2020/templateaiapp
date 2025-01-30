import { AUTH_MESSAGES } from "@/utils/constants";
import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email(AUTH_MESSAGES.INVALID_EMAIL),
    password: z.string().min(1, AUTH_MESSAGES.PASSWORD_REQUIRED),
    rememberMe: z.boolean().default(false),
});


export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: AUTH_MESSAGES.PASSWORD_MISMATCH,
    path: ["confirmPassword"],
});
