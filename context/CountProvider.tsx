import { createContext, useEffect, useState } from 'react';
import { CurrentCart } from '../pages/products/[slug]';
import { getCookie } from '../utils/cookies';

type Props = {
  children: JSX.Element;
};

type CountContextType = {
  totalItemQuantity: number;
  handleItemQuantity: () => void;
};

export const countStateContext = createContext<CountContextType>(
  {} as CountContextType,
);
export default function CountProvider(props: Props) {
  const [totalItemQuantity, setTotalItemQuantity] = useState(0);

  function handleItemQuantity() {
    const cart: CurrentCart[] = getCookie('cart') || [];
    const totalQuantity = cart.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
    setTotalItemQuantity(totalQuantity);
    console.log('count ran');
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
