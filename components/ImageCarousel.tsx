import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Book } from '../pages/products';

type Props = {
  books: Book[];
};
export default function ImageCarousel(props: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === props.books.length - 1 ? 0 : prevSlide + 1,
    );
  }, [props.books.length]);

  const previousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? props.books.length - 1 : prevSlide - 1,
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);

    return () => clearInterval(slideInterval);
  }, [currentSlide, nextSlide]);
  return (
    <section>
      <div className="flex justify-center items-center relative w-fit">
        <button
          onClick={previousSlide}
          className="w-8 h-8 absolute left-0  z-10"
          aria-label="previous slide"
        >
          <ArrowCircleLeftIcon className="fill-[#3AAFA9]" />
        </button>
        {props.books.map((book, index) => {
          return (
            <div
              key={`${book.bookName}-${book.id}`}
              className={
                index === currentSlide
                  ? 'block animate-fadeVisibility'
                  : 'hidden'
              }
            >
              <Link href={`products/${book.slug}`}>
                <div>
                  <Image
                    src={`/images/${book.slug}.jpg`}
                    width="640"
                    height="463"
                    className="rounded-3xl cursor-pointer"
                    priority={true}
                  />
                </div>
              </Link>
            </div>
          );
        })}
        <button
          onClick={nextSlide}
          className="w-8 h-8 absolute right-0 z-10 cursor-pointer"
          aria-label="next slide"
        >
          <ArrowCircleRightIcon className="fill-[#3AAFA9]" />
        </button>
      </div>
    </section>
  );
}
