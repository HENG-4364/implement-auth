import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().nonempty({ message: "First Name is required*" }),
  lastName: z.string().nonempty({ message: "Last Name is required*" }),
  email: z
    .string()
    .email({ message: "Invalid email address*" })
    .nonempty({ message: "Email is required*" }),
  password: z
    .string()
    .nonempty({ message: "Password is required*" }),
  comfirmPassword: z
    .string()
    .nonempty({ message: "Confirm Password is required*" }),
});
