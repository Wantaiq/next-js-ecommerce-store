import jwt from 'jsonwebtoken';

export function auth(handler) {
  return function (req, res) {
    jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (!err && decoded) {
          return await handler(req, res);
        }
        res.status(403).send('You are not authorized');
      },
    );
  };
}
