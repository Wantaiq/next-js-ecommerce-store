import camelcaseKeys from 'camelcase-keys';
import pool from '../../../utils/database';

export default async function getQueriedBook(req, res) {
  if (req.method !== 'GET') {
    res.status(400).send('Method not allowed');
  }
  try {
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [
      req.query.id,
    ]);
    const [book] = rows;
    res.json(camelcaseKeys(book));
  } catch (error) {
    res.send(error.message);
  }
}
