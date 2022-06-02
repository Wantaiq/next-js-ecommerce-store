const books = [
  {
    book_name: 'Eat beautiful',
    slug: 'eat-beautiful',
    author: 'Wendy Rowe',
    price: 32,
  },
  {
    book_name: 'Your soul is a river',
    slug: 'your-soul-is-a-river',
    author: 'Nikita Gill',
    price: 37,
  },
  {
    book_name: 'My secret plan to rule the world',
    slug: 'my-secret-plan-to-rule-the-world',
    author: 'Unknown',
    price: 41,
  },
  {
    book_name: 'Independent coffee guide',
    slug: 'independent-coffee-guide',
    author: 'Unknown',
    price: 23,
  },
];

exports.up = async (sql) => {
  await sql`INSERT INTO books ${sql(
    books,
    'book_name',
    'slug',
    'author',
    'price',
  )}`;
};

exports.down = async (sql) => {
  for (const book of books) {
    await sql`
			DELETE FROM
			books
			WHERE
			book_name = ${book.book_name} AND
      slug = ${book.slug}
			AND author = ${book.author}
			AND price = ${book.price}
		`;
  }
};
