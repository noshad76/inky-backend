import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { signToken } from "../utils/jwt";
import { AuthResponse } from "../types/auth.types";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (existing.length > 0) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const [user] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      passwordHash,
    })
    .returning();
  const { passwordHash: _, ...safeUser } = user;
  const token = signToken({ userId: user.id });

  return { user: safeUser, token };
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash);

  if (!valid) {
    throw new Error("Invalid credentials");
  }
  const { passwordHash: _, ...safeUser } = user;
  const token = signToken({ userId: user.id });

  return { user:safeUser, token };
}
