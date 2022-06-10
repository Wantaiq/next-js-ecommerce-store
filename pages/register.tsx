import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
  } = useForm();
  const router = useRouter();

  async function handleFormSubmit(formInputs: any) {
    const isSignUpValid = await trigger();
    if (isSignUpValid) {
      try {
        const response = await fetch('http://localhost:3000/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': '/application/json' },
          body: JSON.stringify(formInputs),
        });
        if (!response.ok) {
          throw new Error();
        }
        await router.push('/products');
      } catch (err) {
        setError('username', { message: 'Username already exists' });
      }
    }
  }
  return (
    <div className="p-[2em] w-fit mx-auto border-2 border-[#3AAFA9] rounded-xl mt-[11px]">
      <h1 className="font-bold text-3xl tracking-wider text-[#30dfd6] mb-5 border-b-2 pb-5">
        Sign up
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 font-bold tracking-wide indent-2 flex flex-col text-lg"
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register('username', {
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 5,
              message: 'Minimum number of characters is 5',
            },
          })}
        />
        {errors.username ? (
          <p
            data-test-id="error-email"
            className="font-bold tracking-wide text-sm text-red-300"
          >
            {errors.username.message}
          </p>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 5,
              message: 'Minimum number of characters is 5',
            },
          })}
        />
        {errors.password ? (
          <p
            data-test-id="error-email"
            className="font-bold tracking-wide text-sm text-red-300"
          >
            {errors.password.message}
          </p>
        ) : null}
        <button
          data-test-id="checkout-confirm-order"
          className="py-[.45em] text-lg  rounded-full transition-colors duration-500 ease-in-out text-white bg-[#3AAFA9] hover:text-[#3AAFA9] focus:text-[#3AAFA9] hover:bg-stone-200 focus:bg-stone-200 font-bold tracking-wide"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
