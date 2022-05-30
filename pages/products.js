import Image from 'next/image';
import Link from 'next/link';

export default function Products({ books }) {
  return (
    <main className="products flex items-center justify-center px-14 mt-[3em]">
      <section className="grid grid-cols-2 gap-12">
        {books.map((book) => {
          return (
            <div key={`${book.name}-${book.id}`} className="flex items-center">
              <div className="pr-[3em] leading-6">
                <p className="mb-[2em] font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  <br />
                  Sapien et ligula ullamcorper malesuada proin libero nunc.
                </p>
                <p className="font-bold">{book.bookName}</p>
                <p>- {book.author}</p>
              </div>
              <Link
                data-test-id={`product-${book.id}`}
                href={`./products/${book.id}`}
              >
                <div className="shrink-0 w-[50%] cursor-pointer">
                  <Image
                    src={`/images/${book.id}.jpg`}
                    width="640"
                    height="463"
                    className="rounded-3xl"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/books');
  const data = await response.json();

  return {
    props: { books: data },
  };
}
