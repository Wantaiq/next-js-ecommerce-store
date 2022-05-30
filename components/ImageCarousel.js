import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function ImageCarousel({ books }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === books.length - 1 ? 0 : prevSlide + 1,
    );
  }, [books.length]);

  const previousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? books.length - 1 : prevSlide - 1,
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
        {books.map((book, index) => {
          return (
            <div
              key={`${book.bookName}-${book.id}`}
              className={
                index === currentSlide
                  ? 'block animate-fadeVisibility'
                  : 'hidden'
              }
            >
              <Link href={`products/${book.id}`}>
                <div>
                  <Image
                    src={`/images/${book.id}.jpg`}
                    width="640"
                    height="463"
                    className="rounded-3xl cursor-pointer"
                    priority="true"
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
