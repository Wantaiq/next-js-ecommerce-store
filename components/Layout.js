import {
  BookOpenIcon,
  HomeIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import HeaderItem from './HeaderItem';

export default function Layout(props) {
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
          <HeaderItem path="/products" icon={BookOpenIcon} name="Books" />
          <div className="flex">
            <HeaderItem
              path="/cart"
              icon={ShoppingCartIcon}
              name="Cart"
              dataId="products-link"
            />
            <p>quantityOfItemsInCart</p>
          </div>
        </nav>
      </header>
      {props.children}
      <footer>
        <div className="cookies">
          <h1>Do you want some cookies?</h1>
          <button>Accept</button>
          <button>Reject</button>
        </div>
      </footer>
    </>
  );
}
