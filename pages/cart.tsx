import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { countStateContext } from '../context/CountProvider';
import { calculateTotalCartPrice, updateCart } from '../util/cartFunctions';
import { setCookie } from '../util/cookies';
import { Book } from './products';
import { CurrentCookieCart } from './products/[slug]';

type UpdatedCart = {
  id: number;
  bookName: string;
  quantityBought: number;
  slug: string;
  author: string;
  price: number;
};
type Props = {
  totalPrice: number;
  cart: UpdatedCart[];
  cookieCart: CurrentCookieCart[];
  books: Book[];
};

export default function Cart(props: Props) {
  const [currentCart, setCurrentCart] = useState(props.cart);
  const [cookieCart, setCookieCart] = useState(props.cookieCart);
  const [totalPrice, setTotalPrice] = useState(props.totalPrice);
  const { handleItemQuantity } = useContext(countStateContext);

  function handleDeleteItemFromCart(id: number) {
    const filterCart = cookieCart.filter((item) => item.id !== id);
    const updateCurrentCart = updateCart(filterCart, props.books);
    setCurrentCart(updateCurrentCart);
    setCookie('cart', filterCart);
    setCookieCart(filterCart);
  }

  useEffect(() => {
    const updatePrice = calculateTotalCartPrice(currentCart);
    setTotalPrice(updatePrice);
  }, [currentCart]);

  if (currentCart.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center space-y-10">
        <h1 className="text-center font-extrabold tracking-wide mt-32 text-2xl">
          Your cart is empty
        </h1>
        <Link href="/products">
          <a className="inline-block text-[#1c1c1c] bg-[#3AAFA9] px-6 py-3 rounded-3xl font-bold transition-colors duration-500 ease-in-out hover:bg-stone-300 focus:bg-stone-300">
            Browse our library
          </a>
        </Link>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Mock store cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <div className="w-[100] mx-auto my-20 grid grid-cols-2 gap-x-24 gap-y-10 px-10">
          {currentCart.map((item) => {
            return (
              <div
                key={`${item.price}-${item.id}`}
                className="flex justify-between space-x-4"
              >
                <div className="w-[350px] shrink-0 mr-4">
                  <Image
                    src={`/images/${item.slug}.jpg`}
                    width="640"
                    height="463"
                    className="rounded-3xl"
                  />
                </div>
                <div
                  data-test-id={`cart-product-${item.slug}`}
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
                    {item.bookName}
                  </p>
                  <p className="font-medium">
                    Price :{' '}
                    <span className="font-bold tracking-wider">
                      {item.price}
                    </span>
                  </p>
                  <p className="font-medium">
                    Quantity :{' '}
                    <span
                      data-test-id={`cart-product-quantity-${item.slug}`}
                      className="font-bold tracking-wider"
                    >
                      {item.quantityBought}
                    </span>
                  </p>
                  <button
                    data-test-id={`cart-product-remove-${item.slug}`}
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
          <p className="font-bold tracking-wide text-lg">
            Total price: <span data-test-id="cart-total">{totalPrice}</span>
          </p>
          <Link href="/checkout">
            <a
              data-test-id="checkout"
              className="py-[.5em] px-[2em] text-base  rounded-full transition-colors duration-500 ease-in-out text-[#1c1c1c] bg-[#3AAFA9] hover:text-[#3AAFA9] focus:text-[#3AAFA9] hover:bg-stone-200 focus:bg-stone-200 font-bold tracking-wide"
            >
              Checkout
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch(
    'https://next-js-ecommerce-mock.herokuapp.com/api/books',
  );
  const allBooks: Book[] = await response.json();
  const cartCookie: CurrentCookieCart[] = JSON.parse(
    context.req.cookies.cart || '[]',
  );

  const updatedCart = updateCart(cartCookie, allBooks);
  const totalPrice = calculateTotalCartPrice(updatedCart);

  return {
    props: {
      cart: updatedCart,
      totalPrice: totalPrice,
      cookieCart: cartCookie,
      books: allBooks,
    },
  };
}
