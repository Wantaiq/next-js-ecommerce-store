import Image from 'next/image';
import { useContext, useState } from 'react';
import { countStateContext } from '../context/CountProvider';
import { setCookie } from '../utils/cookies';

export default function Cart(props) {
  const [cart, setCart] = useState(props.cart);
  const [totalPrice, setTotalPrice] = useState(props.totalPrice);
  const { handleItemQuantity } = useContext(countStateContext);

  function handleDeleteItemFromCart(id) {
    const updateCart = cart.filter((item) => item.bookId !== id);
    setCookie('cart', updateCart);
    setCart(updateCart);
    const updatePrice = updateCart.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.bookPrice * currentValue.bookQuantity;
    }, 0);
    setTotalPrice(updatePrice);
  }
  return (
    <div className="flex">
      <div className="w-[100] mx-auto my-20 grid grid-cols-3 gap-24 px-6">
        {cart.map((item) => {
          return (
            <div
              key={`${item.bookPrice}-${item.bookId}`}
              className="flex justify-between"
            >
              <div className="w-[300px] shrink-0 mr-6">
                <Image
                  src={`/images/${item.bookId}.jpg`}
                  width="640"
                  height="463"
                  className="rounded-3xl"
                />
              </div>
              <div
                data-test-id={`cart-product-${item.bookId}`}
                className="w-[200px] space-y-2 tracking-wide text-lg shrink-0 py-2"
              >
                <p className="font-medium">
                  Author :{' '}
                  <span className="font-bold tracking-wider">
                    {item.bookAuthor}
                  </span>
                </p>
                <p className="font-medium">
                  Title :{' '}
                  <span className="font-bold tracking-wider">
                    {item.bookName}
                  </span>
                </p>
                <p className="font-medium">
                  Price :{' '}
                  <span className="font-bold tracking-wider">
                    {item.bookPrice}
                  </span>
                </p>
                <p
                  data-test-id={`cart-product-quantity-${item.bookId}`}
                  className="font-medium"
                >
                  Quantity :{' '}
                  <span className="font-bold tracking-wider">
                    {item.bookQuantity}
                  </span>
                </p>
                <button
                  data-test-id={`cart-product-remove-${item.bookId}`}
                  onClick={() => {
                    handleDeleteItemFromCart(item.bookId);
                    handleItemQuantity();
                  }}
                  className="py-[.3em] px-[.9em]  rounded-full transition-colors duration-500 ease-in-out text-stone-200 bg-red-400 hover:text-stone-200 focus:text-stone-200 hover:bg-red-500 focus:bg-red-500 font-bold tracking-wide text-lg"
                >
                  Remove item
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <p data-test-id="cart-product-remove-<product id>">
          Total price: {totalPrice}
        </p>
        <button>Checkout</button>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const cartCookie = JSON.parse(context.req.cookies.cart || '[]');
  const totalPrice = cartCookie.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.bookPrice * currentValue.bookQuantity;
  }, 0);
  return {
    props: { cart: cartCookie, totalPrice: totalPrice },
  };
}
