import { Book } from '../pages/products';
import { CurrentCookieCart } from '../pages/products/[slug]';

export function handleAddToCart(
  id: number,
  quantity: number,
  queriedBook: Book,
  cookieCart: CurrentCookieCart[],
) {
  if (typeof queriedBook === 'undefined') return;
  const itemInCart = cookieCart.find((item) => item.id === id);
  let updateCart: CurrentCookieCart[];
  if (itemInCart) {
    updateCart = cookieCart.map((item) => {
      return item.id === id
        ? {
            ...item,
            quantity: item.quantity + quantity,
          }
        : item;
    });
  } else {
    updateCart = [
      ...cookieCart,
      {
        id: queriedBook.id,
        quantity: quantity,
      },
    ];
  }
  return updateCart;
}
