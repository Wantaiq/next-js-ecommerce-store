import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { countStateContext } from '../context/CountProvider';
import { deleteCookie } from '../util/cookies';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  postalCode: number;
  creditCardNumber: number;
  expirationDate: number;
  ccv: number;
};
export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>();
  const router = useRouter();
  async function handleFormSubmit(formValues: FormValues) {
    console.log(formValues);
    try {
      const isFormValid = await trigger();
      console.log(isFormValid);
      if (isFormValid) {
        await router.push('/thank-you');
        deleteCookie('cart');
        handleItemQuantity();
      }
    } catch (err) {
      console.log(err);
    }
  }
  const { handleItemQuantity } = useContext(countStateContext);
  return (
    <div className="p-[2em] w-fit mx-auto border-2 border-[#3AAFA9] rounded-xl mt-[11px]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 font-bold tracking-wide indent-2 flex flex-col"
      >
        <div className="flex flex-col space-y-2">
          <h1 className="border-b-2 pb-[1em] text-[#3AAFA9] font-bold tracking-wide">
            Contact information
          </h1>
          <label className="block pb-[.2em]" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            {...register('email', {
              required: {
                value: true,
                message: 'This field is required',
              },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gm,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email ? (
            <span className="font-bold tracking-wide text-sm text-red-300">
              {errors.email.message}
            </span>
          ) : null}
        </div>
        <div className="shipping-info flex flex-col space-y-4">
          <h1 className="border-y-2 py-[1em] text-[#3AAFA9] font-bold tracking-wide">
            Shipping information
          </h1>
          <div className="flex space-x-4">
            <div>
              <label className="block pb-[.2em]" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                {...register('firstName', {
                  required: {
                    value: true,
                    message: 'This field is required',
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Please enter valid first name',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum number of characters is 20',
                  },
                })}
              />
              {errors.firstName ? (
                <p className="font-bold tracking-wide text-sm text-red-300">
                  {errors.firstName.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block pb-[.2em]" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                {...register('lastName', {
                  required: {
                    value: true,
                    message: 'This field is required',
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Please enter valid last name',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Maximum number of characters is 30',
                  },
                })}
              />
              {errors.lastName ? (
                <p className="font-bold tracking-wide text-sm text-red-300">
                  {errors.lastName.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <div>
                <label className="block pb-[.2em]" htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  {...register('country', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    maxLength: {
                      value: 56,
                      message: 'Maximum number of characters is 56',
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: 'Please enter valid name',
                    },
                  })}
                />
                {errors.country ? (
                  <p className="font-bold tracking-wide text-sm text-red-300">
                    {errors.country.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block pb-[.2em]" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  {...register('city', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    maxLength: {
                      value: 85,
                      message: 'Maximum number of characters is 85',
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: 'Please enter valid name',
                    },
                  })}
                />
                {errors.city ? (
                  <p className="font-bold tracking-wide text-sm text-red-300">
                    {errors.city.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block pb-[.2em]" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  {...register('address', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  })}
                />
                {errors.address ? (
                  <p className="font-bold tracking-wide text-sm text-red-300">
                    {errors.address.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block pb-[.2em]" htmlFor="postal-code">
                  Postal code
                </label>
                <input
                  id="postal-code"
                  {...register('postalCode', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  })}
                />
                {errors.postalCode ? (
                  <p className="font-bold tracking-wide text-sm text-red-300">
                    {errors.postalCode.message}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="payment-info flex flex-col space-y-2">
            <h1 className="border-y-2 py-[1em] text-[#3AAFA9] font-bold tracking-wide">
              Payment information
            </h1>
            <label className="block pb-[.2em]" htmlFor="credit-card-number">
              Credit card number
            </label>
            <input
              placeholder="xxxx xxxx xxxx xxxx"
              type="number"
              inputMode="numeric"
              {...register('creditCardNumber', {
                pattern: {
                  value: /^[0-9]*$/gm,
                  message: 'Please use only numbers',
                },
                required: {
                  value: true,
                  message: 'This field is required',
                },
                maxLength: {
                  value: 19,
                  message: 'Maximum number of characters is 19',
                },
                minLength: {
                  value: 15,
                  message: 'Minimum number of characters is 15',
                },
              })}
            />
            {errors.creditCardNumber ? (
              <p className="font-bold tracking-wide text-sm text-red-300">
                {errors.creditCardNumber.message}
              </p>
            ) : null}
            <div className="flex space-x-4">
              <div>
                <label
                  className="block pb-[.2em]"
                  htmlFor="credit-card-expiration-date"
                >
                  Expiration date
                </label>
                <input
                  id="credit-card-expiration-date"
                  {...register('expirationDate', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    minLength: {
                      value: 4,
                      message: 'Minimum number of characters is 4',
                    },
                    maxLength: {
                      value: 4,
                      message: 'Maximum number of characters is 4',
                    },
                  })}
                />
                {errors.expirationDate ? (
                  <p className="font-bold tracking-wide text-sm text-red-300">
                    {errors.expirationDate.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block pb-[.2em]" htmlFor="credit-card-ccv">
                  CCV
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  {...register('ccv', {
                    pattern: {
                      value: /^[0-9]*$/gm,
                      message: 'Please use only numbers',
                    },
                    maxLength: {
                      value: 3,
                      message: 'Maximum number of characters is 3',
                    },
                    minLength: {
                      value: 3,
                      message: 'Minimum number of characters is 3',
                    },
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  })}
                />
                {errors.ccv ? (
                  <p className="font-bold tracking-wide text-sm text-red-300">
                    {errors.ccv.message}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <button className="py-[.45em] text-base  rounded-full transition-colors duration-500 ease-in-out text-[#1c1c1c] bg-[#3AAFA9] hover:text-[#3AAFA9] focus:text-[#3AAFA9] hover:bg-stone-200 focus:bg-stone-200 font-bold tracking-wide">
          Confirm Order
        </button>
      </form>
    </div>
  );
}
