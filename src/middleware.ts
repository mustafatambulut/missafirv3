import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "tr", "hr"],
  defaultLocale: "tr"
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
