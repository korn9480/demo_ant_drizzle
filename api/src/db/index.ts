import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "drizzle/schema";
import * as relations from "drizzle/relations";

export const database = drizzle(process.env.DATABASE_URL!, {
    schema: { ...schema, ...relations },
    mode: 'default'
});
