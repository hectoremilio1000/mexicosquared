import "../styles/main.css";
import "../styles/global.css";

import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  // console.log(TIXTOK_PIXEL_ID);

  const router = useRouter();

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
