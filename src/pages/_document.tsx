import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Pilketos</title>
      <meta
        name="description"
        content="Mary's simple recipe for maple bacon donuts
           makes a sticky, sweet treat with just a hint
           of salt that you'll keep coming back for."
      ></meta>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="use-credentials"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <body className="select-none">
        <Main />
        <NextScript />
        <p className="font-['Poppins'] text-sm text-stone-800 font-bold fixed bottom-0 text-center w-full my-1 z-[99999]">
          &copy; {new Date().getFullYear()}{" "}
          <a
            target="_blank"
            href="https://insta.openinapp.co/rizkymaulana"
            className="hover:underline"
          >
            Rizky Maulana
          </a>
          .<span className="hidden lg:inline"> All Rights Reserved.</span>
        </p>
      </body>
    </Html>
  );
}
