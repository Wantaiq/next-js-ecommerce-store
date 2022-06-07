import bcrypt from 'bcrypt';
import sql from '../../../util/database';

export default async function loginHandler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send('Method not allowed');
    return;
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await sql`INSERT INTO
  users (
    username, pwd)
    VALUES(${req.body.userName}, ${hash})`;
  } catch (err) {
    res.status(400).send('Username already exists.');
  }
}
