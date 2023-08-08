const locales = {
  en: () => import("../../locales/en.json").then((r) => r.default),
  tr: () => import("../../locales/tr.json").then((r) => r.default),
  hr: () => import("../../locales/hr.json").then((r) => r.default)
};

export const getLocale = (lang) => locales[lang]();
