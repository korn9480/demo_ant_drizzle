import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

export const database = drizzle(process.env.DATABASE_URL!);
