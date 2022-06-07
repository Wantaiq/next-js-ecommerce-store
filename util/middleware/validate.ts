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
      await schema.validate(req.body, { stripUnknown: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    await handler(req, res);
  };
}
