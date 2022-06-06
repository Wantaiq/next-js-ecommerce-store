import { object, string } from 'yup';

const formSchema = object({
  email: string()
    .required()
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gm),
  firstName: string()
    .required()
    .matches(/^[a-zA-Z]+$/)
    .max(20),
  lastName: string()
    .required()
    .matches(/^[a-zA-Z]+$/)
    .max(30),
  country: string()
    .required()
    .matches(/^[a-zA-Z]+$/)
    .max(56),
  city: string()
    .required()
    .matches(/^[a-zA-Z]+$/)
    .max(85),
  address: string().required(),
  postalCode: string().required(),
  creditCardNumber: string()
    .required()
    .matches(/^[0-9]*$/gm)
    .max(19)
    .min(15),
  expirationDate: string().required().max(4).min(4),
  ccv: string()
    .required()
    .matches(/^[0-9]*$/gm)
    .max(3)
    .min(3),
});

export default formSchema;
