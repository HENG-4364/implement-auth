import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address*" })
    .nonempty({ message: "Email is required*" })
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must be a ' @gmail.com '*",
    }),
  password: z
    .string()
    .nonempty({ message: "Password is required*" }),
});
