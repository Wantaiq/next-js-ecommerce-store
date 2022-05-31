import Image from 'next/image';

export default function Cart({ books }) {
  return (
    <div className="flex">
      <div className="w-[100] mx-auto my-20 grid grid-cols-3 gap-24 px-6">
        {books.map((item) => {
          return (
            <div
              key={`${item.bookPrice}-${item.bookId}`}
              className="flex justify-between"
            >
              <div className="w-[300px] shrink-0 mr-6">
                <Image
                  src={`/images/${item.bookId}.jpg`}
                  width="640"
                  height="463"
                  className="rounded-3xl"
                />
              </div>
              <div
                data-test-id={`cart-product-${item.bookId}`}
                className="w-[200px] space-y-2 tracking-wide text-lg shrink-0 py-2"
              >
                <p className="font-medium">
                  Author :{' '}
                  <span className="font-bold tracking-wider">
                    {item.bookAuthor}
                  </span>
                </p>
                <p className="font-medium">
                  Title :{' '}
                  <span className="font-bold tracking-wider">
                    {item.bookName}
                  </span>
                </p>
                <p className="font-medium">
                  Price :{' '}
                  <span className="font-bold tracking-wider">
                    {item.bookPrice}
                  </span>
                </p>
                <p
                  data-test-id={`cart-product-quantity-${item.bookId}`}
                  className="font-medium"
                >
                  Quantity :{' '}
                  <span className="font-bold tracking-wider">
                    {item.bookQuantity}
                  </span>
                </p>
                <button data-test-id={`cart-product-remove-${item.bookId}`}>
                  Remove item
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <p data-test-id="cart-product-remove-<product id>">Total price: 00</p>
        <button>Checkout</button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/books');
  const books = await response.json();
  return {
    props: { books: books },
  };
}
