import camelcaseKeys from 'camelcase-keys';
import sql from '../../util/database';

export default async function getAllBooks(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).send('Method not allowed');
  }
  try {
    const allBooks = await sql`SELECT * FROM books`;
    res.json(allBooks.map((item) => camelcaseKeys(item)));
  } catch (error) {
    res.send(error.message);
  }
}
