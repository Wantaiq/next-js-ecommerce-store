import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from '../../../util/database';

export default async function handleLogin(req, res) {
  const parseBody = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.status(400).send('Method not allowed');
  }
  const [currentUser] =
    await sql`SELECT * from users WHERE username = ${parseBody.username}`;
  if (typeof currentUser === 'undefined') {
    res.status(400).json({ message: 'Can not find user' });
    return;
  }
  try {
    if (await bcrypt.compare(parseBody.password, currentUser.pwd)) {
      res.status(200).send('Login successful');
      // const authToken = jwt.sign(
      //   { user: currentUser.username },
      //   process.env.ACCESS_TOKEN_SECRET,
      //   { expiresIn: '1h' },
      // );
      // res.send(authToken);
    } else {
      res.status(403).send('Login failed.');
    }
  } catch (error) {
    res.status(500).send();
  }
}
