import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import sql from '../../../util/database';

export default async function handleLogin(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send('Method not allowed');
    return;
  }
  const parseBody = JSON.parse(req.body);
  const [currentUser] =
    await sql`SELECT * from users WHERE username = ${parseBody.username}`;
  if (typeof currentUser === 'undefined') {
    res.status(400).json({ message: 'Can not find user' });
    return;
  }
  try {
    if (await bcrypt.compare(parseBody.password, currentUser.pwd)) {
      const authToken = jwt.sign(
        { user: currentUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' },
      );
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth', authToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/',
        }),
      );
      res.status(200).send('Login successful');
    } else {
      res.status(403).send('Login failed.');
      return;
    }
  } catch (error) {
    res.status(500).send();
  }
}
