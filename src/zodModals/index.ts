import { z } from "zod";

const ZMongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid MongoDB ID" });
const ZName = z
  .string()
  .min(2, { message: "Username must be at least 2 characters" })
  .max(48, { message: "Username must be at most 48 characters" });

const ZEmail = z
  .string()
  .min(1, { message: "Email is required" })
  .email("Email is invalid");
const ZPassword = z.string().min(3, "Password must be at lest 3 characters");
const ZUserRole = z.string().min(3, "Role is required");

export const ZUser = z.object({
  name: ZName,
  email: ZEmail,
  avatar: z.string().optional(),
  role: ZUserRole,
  password: ZPassword,
});
