import createMiddleware from "next-intl/middleware";
import { LOCALES, TR } from "@/app/constants";

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: TR
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
