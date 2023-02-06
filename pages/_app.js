import { Provider } from "react-wrap-balancer";
import "../styles/globals.css";

import untitledSerif from "../public/fonts/serif";
import untitledSans from "../public/fonts/sans";
import { ClashDisplay } from "../public/fonts/mad";
import { JetBrains } from "../public/fonts/mad";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <main className={`${ClashDisplay.className} ${JetBrains.className}`}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default MyApp;
