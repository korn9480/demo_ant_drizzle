import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  // './node_modules/drizzle'
  out: './node_modules/drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
