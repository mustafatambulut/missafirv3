import createMiddleware from "next-intl/middleware";
import { EN, LOCALES } from "@/app/constants";

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: EN
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
