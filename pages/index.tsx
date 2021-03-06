import Head from 'next/head';
import Link from 'next/link';
import ImageCarousel from '../components/ImageCarousel';
import { Book } from './products';

type Props = {
  books: Book[];
};
export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>Reads</title>
        <meta name="description" content="Mock store landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-2 px-20 py-24">
        <section>
          <ImageCarousel books={props.books} />
        </section>
        <section className="px-5 flex flex-col items-center space-y-12">
          <h1 className="text-center text-3xl font-bold tracking-tight leading-6 border-b-[2px] w-full pb-[1em]">
            Welcome to{' '}
            <span className="text-[#3AAFA9] font-bold text-shadow text-5xl ml-1 mr-1">
              .
            </span>
            <span className="text-[#3AAFA9] font-bold text-shadow text-3xl">
              Reads
            </span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            blandit volutpat maecenas. Dignissim convallis aenean et tortor. Non
            sodales neque sodales ut etiam sit amet. Ut venenatis tellus in
            metus vulputate eu. Semper eget duis at tellus at urna condimentum.
            Vulputate eu scelerisque felis imperdiet proin fermentum leo.
            Suspendisse interdum consectetur libero id. Tellus elementum
            sagittis vitae et leo duis. Ipsum dolor sit amet consectetur
            adipiscing elit duis tristique sollicitudin. Volutpat est velit
            egestas dui id ornare arcu odio ut. Dolor purus non enim praesent
            elementum facilisis leo vel fringilla. Cursus euismod quis viverra
            nibh cras. Viverra nam libero justo laoreet sit amet.
          </p>
          <Link href="/products">
            <a className="inline-block text-[#1c1c1c] bg-[#3AAFA9] px-6 py-3 rounded-3xl font-bold transition-colors duration-500 ease-in-out hover:bg-stone-300 focus:bg-stone-300">
              Browse our library
            </a>
          </Link>
        </section>
      </main>
    </>
  );
}
export async function getServerSideProps() {
  const response = await fetch(
    'https://next-js-ecommerce-mock.herokuapp.com/api/books/',
  );
  const data = await response.json();

  return {
    props: {
      books: data,
    },
  };
}
