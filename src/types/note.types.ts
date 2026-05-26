import { InferSelectModel } from "drizzle-orm";
import { notes } from "../db/schema";

export type Note = InferSelectModel<typeof notes>;