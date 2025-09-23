import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import AuthContextProvider from "@/context";
import Footer from "../components/footer";
import Head from "next/head";
require("dotenv").config();

const inter = Inter({ subsets: ["latin"] });
const supabaseUrl = "https://yjiwgellliymqmxejgee.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({ supabaseUrl, supabaseKey })
  );
  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
  };

  const theme = extendTheme({ config });

  // Clear service worker cache on app load to fix routing issues
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Clear all caches
      caches
        .keys()
        .then(function (cacheNames) {
          return Promise.all(
            cacheNames.map(function (cacheName) {
              console.log("Deleting cache:", cacheName);
              return caches.delete(cacheName);
            })
          );
        })
        .then(function () {
          console.log("All caches cleared");
          // Force reload to get fresh content
          if (window.location.pathname.includes("/products/")) {
            window.location.reload();
          }
        });
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        {/* <Analytics /> */}

        <Head>
          <title>ramyantara.com</title>
          <meta
            name="Ramyantara.com"
            content="ramyantara Financial Services provides top-notch financial solutions, specializing in equity, insurance, bonds & NCDs, PMS/AIF, currency, commodities, mutual funds, and loans & fixed deposits."
          />
          <meta
            name="google-site-verification"
            content="OKVnDKVN_aY9YQ3zNgp35ZIC0Q6tbbEHulOUKOSMna8"
          />
        </Head>
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <div className={inter.className}>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </div>
          </AuthContextProvider>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
}
