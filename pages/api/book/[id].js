import camelcaseKeys from 'camelcase-keys';
import sql from '../../../utils/database';

export default async function getQueriedBook(req, res) {
  if (req.method !== 'GET') {
    res.status(400).send('Method not allowed');
  }
  try {
    const [book] = await sql`SELECT * FROM books WHERE id = ${req.query.id}`;
    res.json(camelcaseKeys(book));
  } catch (error) {
    res.send(error.message);
  }
}
