import {
  BookOpenIcon,
  HomeIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { useContext, useEffect, useState } from 'react';
import { countStateContext } from '../context/CountProvider';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';
import HeaderItem from './HeaderItem';

type Props = {
  children: JSX.Element;
};
export default function Layout(props: Props) {
  const { totalItemQuantity } = useContext(countStateContext);
  const [isCookieQueryAnswered, setIsCookieQueryAnswered] = useState(false);
  useEffect(() => {
    if (getLocalStorage('areCookiesAccepted')) {
      setIsCookieQueryAnswered(true);
    }
  }, []);
  return (
    <>
      <header className="border-b-2 flex justify-between py-5 px-20 drop-shadow-xl">
        <div className="text-[#3AAFA9]">
          <p className="text-shadow font-extrabold tracking-widest text-3xl">
            <span className="text-6xl">.</span>Reads
          </p>
        </div>

        <nav className="flex px-7 py-5 pb-0 space-x-[3em] justify-end">
          <HeaderItem path="/" icon={HomeIcon} name="Home" />
          <HeaderItem
            path="/products"
            dataId="products-link"
            icon={BookOpenIcon}
            name="Books"
          />
          <div className="flex group">
            <HeaderItem
              path="/cart"
              icon={ShoppingCartIcon}
              name="Cart"
              dataId="cart-link"
            />
            <p className="group-hover:animate-bounce" data-test-id="cart-count">
              {totalItemQuantity}
            </p>
          </div>
        </nav>
      </header>
      {props.children}
      <footer
        className={`absolute bottom-0 w-full ${
          isCookieQueryAnswered ? 'hidden' : 'block'
        }`}
      >
        <div className="py-4 bg-[#3AAFA9] text-[#1c1c1c] font-bold flex flex-col justify-center items-center">
          <h2 className="mb-4 text-lg">Do you want some cookies?</h2>
          <div className="space-x-8">
            <button
              className="font-semibold tracking-wide py-[.4em] px-[2em] bg-[#1c1c1c] text-stone-200 rounded-[25px]
            hover:text-[#1c1c1c] hover:bg-stone-300 focus:bg-stone-300 focus:text-[#1c1c1c] transition-colors duration-500 ease-in-out"
              onClick={() => {
                setLocalStorage('areCookiesAccepted', true);
                setIsCookieQueryAnswered(true);
              }}
            >
              Accept All
            </button>
            <button
              className="font-semibold tracking-wide py-[.4em] px-[2em] bg-[#1c1c1c] text-stone-200 rounded-[25px]
            hover:text-[#1c1c1c] hover:bg-stone-300 focus:bg-stone-300 focus:text-[#1c1c1c] transition-colors duration-500 ease-in-out"
              onClick={() => {
                setLocalStorage('areCookiesAccepted', true);
                setIsCookieQueryAnswered(true);
              }}
            >
              Allow only essential
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
