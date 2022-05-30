import Image from 'next/image';

export default function Book(props) {
  if (!props.book) {
    return (
      <div>
        <h1>Product not found.</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center mt-[5em]">
      <div className="p-[5em]">
        <p className="text-xl font-semibold tracking-wide mb-[.5em]">
          {props.book.author}
        </p>
        <h1 className="text-2xl font-bold tracking-wider border-b-2 pb-[1em] mb-[1em]">
          {props.book.bookName}
        </h1>
        <p
          data-test-id="product-price"
          className="font-bold text-2xl mb-[.5em]"
        >
          {props.book.price}
        </p>
      </div>
      <Image
        data-test-id="product-image"
        src={`/images/${props.book.id}.jpg`}
        width="640"
        height="463"
        className="rounded-3xl"
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    `http://localhost:3000/api/book/${context.query.productId}`,
  );
  const queriedBook = await response.json();
  return {
    props: { book: queriedBook },
  };
}
