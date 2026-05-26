import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { loginSchema, registerSchema } from "../validation/auth.schema";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  const result = await registerUser(data);

  return res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);

  const result = await loginUser(data);

  res.json(result);
});
