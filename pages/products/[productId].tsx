import Image from 'next/image';
import { useState } from 'react';
import Buttons from '../../components/Buttons';
import { setCookie } from '../../utils/cookies';

export type Cart = {
  id: number;
  name: string;
  author: string;
  price: number;
  quantity: number;
};
export default function Book(props) {
  const [cart, setCart] = useState(props.cart);

  function handleAddToCart(id, quantity) {
    const itemInCart = cart.find((item) => item.id === id);
    console.log(id, props.book.id);
    console.log(itemInCart);
    console.log(cart);
    let updateCart: Cart[];
    if (itemInCart) {
      updateCart = cart.map((item: Cart) => {
        return item.id === id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item;
      });
    } else {
      updateCart = [
        ...cart,
        {
          id: props.book.id,
          name: props.book.bookName,
          author: props.book.author,
          price: props.book.price,
          quantity: quantity,
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
