export function updateCart(cookieCart, allBooks) {
  if (cookieCart) {
    const getArrayIndexById = cookieCart.map((item) => ({
      ...item,
      id: item.id - 1,
    }));

    const updatedCart = getArrayIndexById.map((itemInCart) => {
      return {
        ...allBooks[itemInCart.id],
        quantityBought: itemInCart.quantity,
      };
    });

    return updatedCart;
  }
  return [];
}

export function calculateTotalCartPrice(cart) {
  const totalPrice = cart.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.quantityBought;
  }, 0);
  return totalPrice;
}
