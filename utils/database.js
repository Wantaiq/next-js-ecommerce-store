import Pool from 'pg-pool';

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_KEY,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_NAME,
});

export default pool;
