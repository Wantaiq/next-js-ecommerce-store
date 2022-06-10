import bcrypt from 'bcrypt';
import sql from '../../../util/database';

export default async function loginHandler(req, res) {
  const parsedBody = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.status(400).send('Method not allowed');
    return;
  }
  try {
    const hashPassword = await bcrypt.hash(parsedBody.password, 10);
    await sql`INSERT INTO
      users (
      username, pwd, user_role)
      VALUES(${parsedBody.username}, ${hashPassword}, 'user')`;
  } catch (error) {
    if (error) {
      res.status(400).json({ message: 'Username already exists' });
    }
  }
}
