import Head from 'next/head';
import Image from 'next/image';

export default function Home(props) {
  return (
    <main>
      <p>Hi</p>
    </main>
  );
}
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/books');
  const data = await response.json();

  return {
    props: {
      books: data,
    },
  };
}
