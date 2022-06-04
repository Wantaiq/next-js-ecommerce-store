import { handleAddToCart } from '../handleAddToCartFunction';

test('if item exists update existing item quantity,if not add new item', () => {
  const params = {
    id: 1,
    quantity: 2,
    queriedBook: {
      id: 1,
      bookName: 'Eat beautiful',
      slug: 'eat-beautiful',
      author: 'Wendy Rowe',
      price: 32,
    },
    cookieCart: [{ id: 1, quantity: 2 }],
  };

  // write function here
  expect(
    handleAddToCart(params.id, params.quantity, params.queriedBook, []),
  ).toStrictEqual(params.cookieCart);
  expect(
    handleAddToCart(
      params.id,
      params.quantity,
      params.queriedBook,
      params.cookieCart,
    ),
  ).toStrictEqual([{ id: 1, quantity: 4 }]);
  expect(
    handleAddToCart(params.id, params.quantity, undefined, params.cookieCart),
  ).toBe(undefined);
});
