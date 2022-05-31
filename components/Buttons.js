import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';

export default function Buttons() {
  return (
    <div className="flex flex-col justify-center space-y-5">
      <div className="flex">
        <button>
          <PlusCircleIcon className="w-7 h-7 active:stroke-[#3AAFA9]" />
        </button>
        <p
          data-test-id="product-quantity"
          className="font-semibold text-3xl my-[.5em] mx-6"
        >
          quantityOfItems
        </p>
        <button>
          <MinusCircleIcon className="w-7 h-7 active:stroke-red-400" />
        </button>
      </div>
      <div>
        <button
          data-test-id="product-add-to-cart"
          className="py-[.5em] px-[1.4em]  rounded-full transition-colors duration-500 ease-in-out bg-[#1c1c1c] hover:text-[#1c1c1c] focus:text-[#1c1c1c] hover:bg-[#3AAFA9] focus:bg-[#3AAFA9] font-bold tracking-wide text-lg"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
