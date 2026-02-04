import * as schema from "drizzle/schema";

export type UserCreated = typeof schema.user.$inferInsert
export type UserLogin = Pick<UserCreated, "username" | "password">