import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { useContext, useState } from 'react';
import { countStateContext } from '../context/CountProvider';
import { Book } from '../pages/products';
import { CurrentCookieCart } from '../pages/products/[slug]';
import { setCookie } from '../util/cookies';
import { handleAddToCart } from '../util/handleAddToCartFunction';

type Props = {
  cookieCart: CurrentCookieCart[];
  bookId: number;
  queriedBook: Book;
  handleSetCart: (param: CurrentCookieCart[]) => void;
};
export default function Buttons(props: Props) {
  const { handleItemQuantity } = useContext(countStateContext);
  const [bookQuantity, setBookQuantity] = useState(1);

  function handleIncrementQuantity() {
    setBookQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleDecrementQuantity() {
    bookQuantity <= 1
      ? setBookQuantity(1)
      : setBookQuantity((prevQuantity) => prevQuantity - 1);
  }

  function updateCurrentCookieCart() {
    const updatedCart = handleAddToCart(
      props.bookId,
      bookQuantity,
      props.queriedBook,
      props.cookieCart,
    );
    if (!updatedCart) return;
    props.handleSetCart(updatedCart);
    setCookie('cart', updatedCart);
  }

  return (
    <div className="flex flex-col justify-center space-y-5">
      <div className="flex">
        <button onClick={handleIncrementQuantity}>
          <PlusCircleIcon className="w-7 h-7 active:stroke-[#3AAFA9]" />
        </button>
        <p
          data-test-id="product-quantity"
          className="font-semibold text-3xl my-[.5em] mx-6"
        >
          {bookQuantity}
        </p>
        <button onClick={handleDecrementQuantity}>
          <MinusCircleIcon className="w-7 h-7 active:stroke-red-400" />
        </button>
      </div>
      <div>
        <button
          data-test-id="product-add-to-cart"
          onClick={() => {
            updateCurrentCookieCart();
            handleItemQuantity();
          }}
          className="py-[.5em] px-[1.4em]  rounded-full transition-colors duration-500 ease-in-out text-[#1c1c1c] bg-[#3AAFA9] hover:text-[#3AAFA9] hover:bg-stone-200 font-bold tracking-wide text-lg"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
