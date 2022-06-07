exports.up = async (sql) => {
  await sql`
		CREATE TABLE users(
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		username VARCHAR(30) NOT NULL UNIQUE,
		pwd VARCHAR(60) NOT NULL
		 )`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE users`;
};
