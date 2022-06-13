import Head from 'next/head';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank you!</title>
        <meta name="description" content="Reads mock store says thank you!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full">
        <h1 className="text-center mt-32 font-extrabold tracking-wide text-2xl">
          <span className="text-[#3AAFA9] ">Thank you</span> for your order!
        </h1>
      </div>
    </>
  );
}
