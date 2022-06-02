import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { countStateContext } from '../context/CountProvider';
import { setCookie } from '../utils/cookies';
import { CurrentCart } from './products/[productId]';

type Props = {
  totalPrice: number;
  cart: CurrentCart[];
};
export default function Cart(props: Props) {
  const [cart, setCart] = useState(props.cart);
  const [totalPrice, setTotalPrice] = useState(props.totalPrice);
  const { handleItemQuantity } = useContext(countStateContext);

  function handleDeleteItemFromCart(id: number) {
    const updateCart = cart.filter((item) => item.id !== id);
    setCookie('cart', updateCart);
    setCart(updateCart);
  }

  useEffect(() => {
    const updatePrice = cart.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * currentValue.quantity;
    }, 0);
    setTotalPrice(updatePrice);
  }, [cart]);
  return (
    <div className="flex flex-col">
      <div className="w-[100] mx-auto my-20 grid grid-cols-2 gap-x-24 gap-y-10 px-10">
        {cart.map((item) => {
          return (
            <div
              key={`${item.price}-${item.id}`}
              className="flex justify-between space-x-4"
            >
              <div className="w-[350px] shrink-0 mr-4">
                <Image
                  src={`/images/${item.id}.jpg`}
                  width="640"
                  height="463"
                  className="rounded-3xl"
                />
              </div>
              <div
                data-test-id={`cart-product-${item.id}`}
                className="w-[200px] space-y-2 tracking-wide text-lg shrink-0 py-2"
              >
                <p className="font-medium">
                  Author :{' '}
                  <span className="font-bold tracking-wider">
                    {item.author}
                  </span>
                </p>
                <p className="font-medium">Title : </p>
                <p className="font-bold tracking-wider text-[#3AAFA9]">
                  {item.name}
                </p>
                <p className="font-medium">
                  Price :{' '}
                  <span className="font-bold tracking-wider">{item.price}</span>
                </p>
                <p
                  data-test-id={`cart-product-quantity-${item.id}`}
                  className="font-medium"
                >
                  Quantity :{' '}
                  <span className="font-bold tracking-wider">
                    {item.quantity}
                  </span>
                </p>
                <button
                  data-test-id={`cart-product-remove-${item.id}`}
                  onClick={() => {
                    handleDeleteItemFromCart(item.id);
                    handleItemQuantity();
                  }}
                  className="py-[.3em] px-[.9em] text-base  rounded-full transition-colors duration-500 ease-in-out text-stone-200 bg-red-400 hover:text-stone-200 focus:text-stone-200 hover:bg-red-500 focus:bg-red-500 font-bold tracking-wide"
                >
                  Remove item
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mx-auto flex space-x-4 items-center">
        <p
          data-test-id="cart-total"
          className="font-bold tracking-wide text-lg"
        >
          Total price: <span>{totalPrice}</span>
        </p>
        <Link href="/checkout">
          <button
            data-test-id="checkout"
            className="py-[.5em] px-[2em] text-base  rounded-full transition-colors duration-500 ease-in-out text-[#1c1c1c] bg-[#3AAFA9] hover:text-[#3AAFA9] focus:text-[#3AAFA9] hover:bg-stone-200 focus:bg-stone-200 font-bold tracking-wide"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const cartCookie: CurrentCart[] = JSON.parse(
    context.req.cookies.cart || '[]',
  );
  const totalPrice = cartCookie.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.quantity;
  }, 0);
  return {
    props: { cart: cartCookie, totalPrice: totalPrice },
  };
}
