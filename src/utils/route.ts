import { map } from "lodash";
import { locationUrls } from "@/utils/locationsMap";

export const Route = {
  statics: [
    {
      en: "login",
      tr: "login",
      hr: "login",
      ru: "login"
    },
    {
      en: "signup",
      tr: "signup",
      hr: "signup",
      ru: "signup"
    },
    {
      en: "become-owner",
      tr: "become-owner",
      hr: "become-owner",
      ru: "become-owner"
    },
    {
      en: "checkout",
      tr: "checkout",
      hr: "checkout",
      ru: "checkout"
    },
    {
      en: "checkout",
      tr: "checkout",
      hr: "checkout",
      ru: "checkout"
    },
    {
      en: "contact",
      tr: "contact",
      hr: "contact",
      ru: "contact"
    },
    {
      en: "faq",
      tr: "faq",
      hr: "faq",
      ru: "faq"
    },
    {
      en: "forgot-password",
      tr: "forgot-password",
      hr: "forgot-password",
      ru: "forgot-password"
    },
    {
      en: "inbox",
      tr: "inbox",
      hr: "inbox",
      ru: "inbox"
    },
    {
      en: "invite-and-earn",
      tr: "invite-and-earn",
      hr: "invite-and-earn",
      ru: "invite-and-earn"
    },
    {
      en: "life-at-missafir",
      tr: "life-at-missafir",
      hr: "life-at-missafir",
      ru: "life-at-missafir"
    },
    {
      en: "new-password",
      tr: "new-password",
      hr: "new-password",
      ru: "new-password"
    },
    {
      en: "profile",
      tr: "profile",
      hr: "profile",
      ru: "profile"
    },
    {
      en: "signup",
      tr: "signup",
      hr: "signup",
      ru: "signup"
    },
    {
      en: "sustainability",
      tr: "sustainability",
      hr: "sustainability",
      ru: "sustainability"
    },
    {
      en: "who-we-are",
      tr: "who-we-are",
      hr: "who-we-are",
      ru: "who-we-are"
    },
    {
      en: "listing",
      tr: "listing",
      hr: "listing",
      ru: "listing"
    },
    {
      en: "reservation",
      tr: "reservation",
      hr: "reservation",
      ru: "reservation"
    }
  ],
  excludeKeys: [
    { tr: "detay" },
    { en: "detail" },
    { ru: "detal" },
    { hr: "detalj" }
  ],
  houseForRent: [
    {
      tr: "kiralik-ev",
      en: "kiralik-ev",
      ru: "kiralik-ev",
      hr: "kiralik-ev"
    }
  ],
  villaForRent: [
    {
      tr: "kiralik-villa",
      en: "kiralik-villa",
      ru: "kiralik-villa",
      hr: "kiralik-villa"
    }
  ],
  furnishedFlatForRent: [
    {
      tr: "esyali-kiralik-daire",
      en: "esyali-kiralik-daire",
      ru: "esyali-kiralik-daire",
      hr: "esyali-kiralik-daire"
    }
  ],
  listing: [
    {
      tr: "listing",
      en: "listing",
      ru: "listing",
      hr: "listing"
    }
  ],
  cities: map(locationUrls, "slug")
};
