import { z } from "zod";

export const AuthCredentialsValidators = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 Charecters long" }),
});

export type TAuthCredentialsValidators = z.infer<
  typeof AuthCredentialsValidators
>;
