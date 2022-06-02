import Cookies from 'js-cookie';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { countStateContext } from '../context/CountProvider';

export default function Checkout() {
  const { handleItemQuantity } = useContext(countStateContext);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [ccv, setCcv] = useState('');
  function handleConfirmOrder() {
    Cookies.remove('cart');
    handleItemQuantity();
  }
  return (
    <div className="p-[2em] w-fit mx-auto border-2 border-[#3AAFA9] rounded-xl mt-[11px]">
      <div className="space-y-4 font-bold tracking-wide indent-2 flex flex-col">
        <div className="flex flex-col space-y-2">
          <h1 className="border-b-2 pb-[1em] text-[#3AAFA9] font-bold tracking-wide">
            Contact information
          </h1>
          <label className="block pb-[.2em]" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="shipping-info flex flex-col space-y-4">
          <h1 className="border-y-2 py-[1em] text-[#3AAFA9] font-bold tracking-wide">
            Shipping information
          </h1>
          <div className="flex space-x-4">
            <div>
              <label className="block pb-[.2em]" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                required={true}
                maxLength={20}
              />
            </div>
            <div>
              <label
                className="block pb-[.2em]"
                htmlFor="lastName"
                maxLength={30}
              >
                Last name
              </label>
              <input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                required={true}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <div>
                <label
                  className="block pb-[.2em]"
                  htmlFor="country"
                  maxLength={56}
                >
                  Country
                </label>
                <input
                  htmlFor="country"
                  value={country}
                  onChange={(e) => setCountry(e.currentTarget.value)}
                  required={true}
                />
              </div>
              <div>
                <label
                  className="block pb-[.2em]"
                  htmlFor="city"
                  maxLength={85}
                >
                  City
                </label>
                <input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.currentTarget.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block pb-[.2em]" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                  required={true}
                />
              </div>
              <div>
                <label className="block pb-[.2em]" htmlFor="postal-code">
                  Postal code
                </label>
                <input
                  id="postal-code"
                  type="number"
                  inputMode="numeric"
                  pattern="^[0-9]{10}$"
                  required={true}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>
          <div className="payment-info flex flex-col space-y-2">
            <h1 className="border-y-2 py-[1em] text-[#3AAFA9] font-bold tracking-wide">
              Payment information
            </h1>
            <label className="block pb-[.2em]" htmlFor="credit-card-number">
              Credit card number
            </label>
            <input
              id="credit-card-number"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              required={true}
              maxLength={19}
              minLength={15}
              placeholder="xxxx xxxx xxxx xxxx"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.currentTarget.value)}
            />
            <div className="flex space-x-4">
              <div>
                <label
                  className="block pb-[.2em]"
                  htmlFor="credit-card-expiration-date"
                >
                  Expiration date
                </label>
                <input
                  id="credit-card-expiration-date"
                  type="tel"
                  inputMode="numeric"
                  required={true}
                  maxLength={4}
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.currentTarget.value)}
                />
              </div>
              <div>
                <label className="block pb-[.2em]" htmlFor="credit-card-ccv">
                  CCV
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  required={true}
                  maxLength="3"
                  value={ccv}
                  onChange={(e) => setCcv(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <Link href="/thankYou">
          <button
            onClick={handleConfirmOrder}
            className="py-[.45em] text-base  rounded-full transition-colors duration-500 ease-in-out text-[#1c1c1c] bg-[#3AAFA9] hover:text-[#3AAFA9] focus:text-[#3AAFA9] hover:bg-stone-200 focus:bg-stone-200 font-bold tracking-wide"
          >
            Confirm Order
          </button>
        </Link>
      </div>
    </div>
  );
}
