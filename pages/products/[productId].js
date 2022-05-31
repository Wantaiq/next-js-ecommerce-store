import Image from 'next/image';
import { useState } from 'react';
import Buttons from '../../components/Buttons';
import { setCookie } from '../../utils/cookies';

export default function Book(props) {
  const [cart, setCart] = useState(props.cart);

  function handleAddToCart(id, quantity) {
    const itemInCart = cart.find((item) => id === item.bookId);
    let updateCart;
    if (itemInCart) {
      updateCart = cart.map((item) => {
        return item.bookId === id
          ? {
              ...item,
              bookQuantity: item.bookQuantity + quantity,
            }
          : item;
      });
    } else {
      updateCart = [
        ...cart,
        {
          bookId: id,
          bookName: props.book.bookName,
          bookAuthor: props.book.author,
          bookPrice: props.book.price,
          bookQuantity: quantity,
        },
      ];
    }
    setCart(updateCart);
    setCookie('cart', updateCart);
  }
  if (!props.book) {
    return (
      <div>
        <h1>Product not found.</h1>
      </div>
    );
  }
  return (
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
        <Buttons handleAddToCart={handleAddToCart} bookId={props.book.id} />
      </div>
      <Image
        data-test-id="product-image"
        src={`/images/${props.book.id}.jpg`}
        width="640"
        height="463"
        className="rounded-3xl"
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    `http://localhost:3000/api/book/${context.query.productId}`,
  );
  const queriedBook = await response.json();
  const cookie = JSON.parse(context.req.cookies.cart || '[]');
  return {
    props: { book: queriedBook, cart: cookie },
  };
}
