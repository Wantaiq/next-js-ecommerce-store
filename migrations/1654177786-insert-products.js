const books = [
  { book_name: 'Eat beautiful', author: 'Wendy Rowe', price: 32 },
  { book_name: 'Your soul is a river', author: 'Nikita Gill', price: 37 },
  {
    book_name: 'My secret plan to rule the world',
    author: 'Unknown',
    price: 41,
  },
  { book_name: 'Independent coffe guide', author: 'Unknown', price: 23 },
];

exports.up = async (sql) => {
  await sql`INSERT INTO books ${sql(books, 'book_name', 'author', 'price')}`;
};

exports.down = async (sql) => {
  for (const book of books) {
    await sql`
			DELETE FROM
			books
			WHERE
			book_name = ${book.book_name}
			AND author = ${book.author}
			AND price = ${book.price}
		`;
  }
};
