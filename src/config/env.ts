import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("3000")
    .transform((val) => parseInt(val, 10)),

  DATABASE_URL: z.url(),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  JWT_EXPIRES_IN: z.string().default("7d"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables");
  const formatted = z.treeifyError(parsedEnv.error);
  console.error(formatted);
  process.exit(1);
}

export const env = parsedEnv.data;
