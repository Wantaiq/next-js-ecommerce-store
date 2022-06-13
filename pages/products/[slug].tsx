import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Buttons from '../../components/Buttons';
import { Book } from '../products';

export type CurrentCookieCart = {
  id: number;
  quantity: number;
};

type Props = {
  cart: CurrentCookieCart[];
  book: Book | null;
};

export default function SingleProduct(props: Props) {
  const [cart, setCart] = useState(props.cart);
  function handleSetCart(value: CurrentCookieCart[]) {
    setCart(value);
  }
  if (!props.book) {
    return (
      <div>
        <h1>Product not found.</h1>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{props.book.bookName}</title>
        <meta
          name="description"
          content={`Mock store ${props.book.bookName}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center items-center mt-[5em]">
        <div className="p-[5em]">
          <p className="text-xl font-semibold tracking-wide mb-[.5em]">
            {props.book.author}
          </p>
          <h1 className="text-2xl font-bold tracking-wider border-b-2 pb-[1em] mb-[1em] text-[#3AAFA9]">
            {props.book.bookName}
          </h1>
          <p
            data-test-id="product-price"
            className="font-bold text-2xl mb-[.5em]"
          >
            {props.book.price}
          </p>
          <Buttons
            cookieCart={cart}
            queriedBook={props.book}
            bookId={props.book.id}
            handleSetCart={handleSetCart}
          />
        </div>
        <Image
          data-test-id="product-image"
          src={`/images/${props.book.slug}.jpg`}
          width="640"
          height="463"
          className="rounded-3xl"
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query.slug;
  try {
    const response = await fetch(
      `https://next-js-ecommerce-mock.herokuapp.com/api/books/${slug}`,
    );
    const queriedBook = await response.json();
    const cookie: CurrentCookieCart[] = JSON.parse(
      context.req.cookies.cart || '[]',
    );
    return {
      props: { book: queriedBook, cart: cookie },
    };
  } catch (err) {
    if (err) {
      return { props: { book: null } };
    }
  }
}
