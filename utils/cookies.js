import Cookie from 'js-cookie';

export function setCookie(key, value) {
  Cookie.set(key, JSON.stringify(value));
}

export function getCookie(key) {
  try {
    return JSON.parse(Cookie.get(key));
  } catch {
    return undefined;
  }
}
