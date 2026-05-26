import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  passwordHash: text("password_hash").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notes = pgTable(
  "notes",
  {
    id: uuid("id").primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    title: text("title"),

    content: text("content"),

    updatedAt: timestamp("updated_at").notNull(),

    deletedAt: timestamp("deleted_at"),
  },

  (table) => [
    index("notes_user_idx").on(table.userId),
    index("notes_updated_idx").on(table.updatedAt),
  ],
);
