import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address*" })
    .nonempty({ message: "Email is required*" }),
  password: z
    .string()
    .nonempty({ message: "Password is required*" }),
});
