import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signToken(payload: { userId: string }) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}
