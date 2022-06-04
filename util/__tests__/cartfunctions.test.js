import { calculateTotalCartPrice, updateCart } from '../cartFunctions';

test('total price of items in cart', () => {
  const allBooksInDb = [
    {
      id: 1,
      bookName: 'Eat beautiful',
      slug: 'eat-beautiful',
      author: 'Wendy Rowe',
      price: 32,
    },
    {
      id: 2,
      bookName: 'Your soul is a river',
      slug: 'your-soul-is-a-river',
      author: 'Nikita Gill',
      price: 37,
    },
    {
      id: 3,
      bookName: 'My secret plan to rule the world',
      slug: 'my-secret-plan-to-rule-the-world',
      author: 'Unknown',
      price: 41,
    },
    {
      id: 4,
      bookName: 'Independent coffee guide',
      slug: 'independent-coffee-guide',
      author: 'Unknown',
      price: 23,
    },
  ];
  const cookie = [
    { id: 4, quantity: 6 },
    { id: 1, quantity: 3 },
  ];
  expect(updateCart(cookie, allBooksInDb)).toStrictEqual([
    {
      id: 4,
      bookName: 'Independent coffee guide',
      slug: 'independent-coffee-guide',
      author: 'Unknown',
      price: 23,
      quantityBought: 6,
    },
    {
      id: 1,
      bookName: 'Eat beautiful',
      slug: 'eat-beautiful',
      author: 'Wendy Rowe',
      price: 32,
      quantityBought: 3,
    },
  ]);
  expect(updateCart(undefined, allBooksInDb)).toStrictEqual([]);

  expect(
    calculateTotalCartPrice([
      {
        id: 4,
        bookName: 'Independent coffee guide',
        slug: 'independent-coffee-guide',
        author: 'Unknown',
        price: 23,
        quantityBought: 6,
      },
      {
        id: 1,
        bookName: 'Eat beautiful',
        slug: 'eat-beautiful',
        author: 'Wendy Rowe',
        price: 32,
        quantityBought: 3,
      },
    ]),
  ).toBe(234);
});
