import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AdminContextProvider } from "@/context/AdminContext";
import { VoterContextProvider } from "@/context/VoterContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdminContextProvider>
      <VoterContextProvider>
        <Component {...pageProps} />
      </VoterContextProvider>
    </AdminContextProvider>
  );
}
