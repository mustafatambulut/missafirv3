import React from "react";
import { notFound } from "next/navigation";
import ReduxProvider from "@/redux/provider";
import { NextIntlClientProvider } from "next-intl";

import RouteGuard from "@/app/hooks/RouteGuard";

import Header from "@/components/molecules/header/Header";
import Footer from "@/components/molecules/footer/Footer";

import "../styles/globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }, { locale: "hr" }];
}

const RootLayout = async ({ children, params: { lang } }: any) => {
  let messages;
  try {
    messages = (await import(`../../locales/${lang}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={lang}>
      <head>
        <title>Missafirv3 Beta</title>
        <meta
          name="google-site-verification"
          content="L7xAcVXBfqNFTj_VSqCaZU-gKHXK-T7chpoLJZE3FYU"
        />
      </head>
      <body className="font-mi-sans" suppressHydrationWarning={true}>
        <ReduxProvider>
          <NextIntlClientProvider locale={lang} messages={messages}>
            <div id="drawer-container"></div>
            <Header />
            <main>
              <RouteGuard>{children}</RouteGuard>
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
