import { SearchCircleIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type Book = {
  id: number;
  bookName: string;
  slug: string;
  author: string;
  price: number;
};

type Props = {
  books: Book[];
};

export default function Products(props: Props) {
  const [searchInput, setSearchInput] = useState('');
  return (
    <>
      <Head>
        <title>Library</title>
        <meta name="description" content="Mock store library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-between items-center px-32 pt-7 pb-4">
          <h1 className="font-bold text-3xl tracking-wider text-[#30dfd6]">
            Library
          </h1>
          <div>
            <input
              id="search"
              onChange={(e) => setSearchInput(e.currentTarget.value)}
            />
            <SearchCircleIcon className="w-[28px] h-[28px] relative bottom-[31px] left-[86%] stroke-[#1c1c1c]" />
          </div>
        </div>
        <div className="products flex items-center justify-center px-14 mt-[3em]">
          <section className="grid grid-cols-2 gap-12">
            {props.books
              .filter((book) => {
                if (!searchInput) {
                  return book;
                }
                if (
                  book.bookName
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                ) {
                  return book.bookName
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
                }
                return book.author
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
              })
              .map((book) => {
                return (
                  <div
                    key={`${book.slug}-${book.id}`}
                    className="flex items-center"
                  >
                    <div className="pr-[3em] leading-6">
                      <p className="mb-[2em] font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                        <br />
                        Sapien et ligula ullamcorper malesuada proin libero
                        nunc.
                      </p>
                      <p className="font-bold text-[#3AAFA9] tracking-wide">
                        {book.bookName}
                      </p>
                      <p className="font-semibold tracking-wide">
                        - {book.author}
                      </p>
                    </div>
                    <div className="shrink-0 w-[50%] cursor-pointer">
                      <Link href={`./products/${book.slug}`}>
                        <a data-test-id={`product-${book.slug}`}>To book</a>
                      </Link>
                      <Image
                        src={`/images/${book.slug}.jpg`}
                        width="640"
                        height="463"
                        className="rounded-3xl"
                        priority
                      />
                    </div>
                  </div>
                );
              })}
          </section>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    'https://next-js-ecommerce-mock.herokuapp.com/api/books',
  );
  const data = await response.json();

  return {
    props: { books: data },
  };
}
