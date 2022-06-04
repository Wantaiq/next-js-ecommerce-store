import { deleteCookie, getCookie, setCookie } from '../cookies';

test('set, get and delete a cookie', () => {
  const cookie = {
    key: 'cart',
    value: [
      {
        id: 1,
        quantity: 2,
      },
    ],
  };
  expect(setCookie(cookie.key, cookie.value)).toBe(undefined);
  expect(getCookie(cookie.key)).toStrictEqual(cookie.value);
  expect(setCookie(cookie.key, undefined)).toBe(undefined);
  expect(getCookie(cookie.key)).toBe(undefined);
  expect(deleteCookie(cookie.key)).toBe(undefined);
});
