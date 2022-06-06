import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

export default function validateForm(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      res.status(400).send('Method not allowed');
      return;
    }
    try {
      const parsedBody = JSON.parse(req.body);
      await schema.validate(parsedBody, { stripUnknown: true });
    } catch (error) {
      return res.status(400).send(error);
    }
    await handler(req, res);
  };
}
