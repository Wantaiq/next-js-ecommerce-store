import Cookies from 'js-cookie';
import { CurrentCart } from '../pages/products/[productId]';

export function setCookie(key: string, value: CurrentCart[]) {
  Cookies.set(key, JSON.stringify(value));
}

export function getCookie(key: string) {
  const cookieCartValue = Cookies.get(key);
  if (!cookieCartValue) {
    return undefined;
  }
  try {
    return JSON.parse(cookieCartValue);
  } catch {
    return undefined;
  }
}
