import validateForm from '../../../util/middleware/validate';
import formSchema from '../../../util/schemas/form';

function handler(req, res) {
  res.status(200).json('Form is valid');
}
export default validateForm(formSchema, handler);
