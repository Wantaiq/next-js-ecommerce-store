import camelcaseKeys from 'camelcase-keys';
import pool from '../../utils/database';

export default async function getAllBooks(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(400).send('Method not allowed');
    }

    const { rows } = await pool.query('SELECT * FROM books');
    res.json(rows.map((item) => camelcaseKeys(item)));
  } catch (error) {
    res.send(error.message);
  }
}
