import bcrypt from 'bcrypt';
import sql from '../../../util/database';

export default function loginHandler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send('Method not allowed');
    return;
  }
  try {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      await sql`INSERT INTO
      users (
      username, pwd)
      VALUES(${req.body.username}, ${hash})`;
    });
  } catch (err) {
    res.status(400).send('Username already exists.');
  }
}
