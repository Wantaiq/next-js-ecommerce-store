import Cookies from 'js-cookie';
import { CurrentCookieCart } from '../pages/products/[slug]';

export function setCookie(key: string, value: CurrentCookieCart[]) {
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
