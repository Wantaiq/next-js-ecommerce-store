import { createContext, useEffect, useState } from 'react';
import { getCookie } from '../utils/cookies';

export const countStateContext = createContext();
export default function CountProvider(props) {
  const [totalItemQuantity, setTotalItemQuantity] = useState(0);

  function handleItemQuantity() {
    const cart = getCookie('cart') || [];
    const totalQuantity = cart.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
    setTotalItemQuantity(totalQuantity);
  }

  useEffect(() => {
    handleItemQuantity();
  }, []);

  return (
    <countStateContext.Provider
      value={{ totalItemQuantity, handleItemQuantity }}
    >
      {props.children}
    </countStateContext.Provider>
  );
}
