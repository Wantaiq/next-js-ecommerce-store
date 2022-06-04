export function setLocalStorage(key: string, value: boolean) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
  const localStorageValue = localStorage.getItem(key);
  if (!localStorageValue) {
    return undefined;
  }
  return JSON.parse(localStorageValue);
}
