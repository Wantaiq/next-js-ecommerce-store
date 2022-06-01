import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres({
  user: process.env.PGUSER,
  password: process.env.PGKEY,
  host: process.env.PGHOST,
  database: process.env.PGNAME,
});

export default sql;
