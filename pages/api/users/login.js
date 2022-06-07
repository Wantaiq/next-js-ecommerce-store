import bcrypt from 'bcrypt';
import sql from '../../../util/database';

export default async function handleLogin(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send('Method not allowed');
  }
  const [currentUser] =
    await sql`SELECT * from users WHERE username = ${req.body.userName}`;
  console.log(currentUser);
  if (typeof currentUser === 'undefined') {
    res.status(400).send('Cannot find user.');
    return;
  }
  try {
    if (await bcrypt.compare(req.body.password, currentUser.pwd)) {
      res.status(200).send('Login successful');
    } else {
      res.status(400).send('Login failed.');
    }
  } catch (error) {
    res.status(500).send();
  }
}
