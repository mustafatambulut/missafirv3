export const Route = {
  authPagesRoutes: [
    {
      en: {
        login: "login",
        signup: "signup",
        profile: "profile",
        "forgot-password": "forgot-password",
        "new-password": "new-password"
      },
      tr: {
        "giris-yap": "login",
        profil: "profile",
        "uye-ol": "signup",
        "sifremi-unuttum": "forgot-password",
        "yeni-sifre": "new-password"
      }
    }
  ],
  textPagesRoutes: [
    {
      en: {
        terms: 1,
        "privacy-policy": 2,
        "kvkk-aydinlatma-metni": 3
      },
      tr: {
        "kullanici-sozlesmesi": 1,
        "gizlilik-politikasi": 2,
        "kvkk-aydinlatma-metni": 3
      }
    }
  ],
  staticPagesRoutes: [
    {
      en: {
        list: "list",
        "about-us": "about-us",
        "get-an-offer": "get-an-offer",
        contact: "contact",
        faq: "faq",
        "alive-with-missafir": "alive-with-missafir",
        sustainability: "sustainability",
        "referral-program": "referral-program",
        "our-packages": "our-packages"
      },
      tr: {
        list: "list",
        "biz-kimiz": "about-us",
        "teklif-al": "get-an-offer",
        iletisim: "contact",
        "sikca-sorulan-sorular": "faq",
        "missafirde-yasam": "alive-with-missafir",
        surdurulebilirlik: "sustainability",
        "referans-programi": "referral-program",
        "hizmet-paketlerimiz": "our-packages"
      }
    }
  ],
  categoryRoutes: [
    {
      en: {
        "villa-for-rent": "villa",
        "furnished-apartments": "apartment",
        bungalov: "bungalov",
        hotel: "hotel",
        unique: "unique"
      },
      tr: {
        "kiralik-villa": "villa",
        "esyali-kiralik-daire": "apartment",
        bungalov: "bungalov",
        otel: "hotel",
        unique: "unique"
      }
    }
  ],
  baseListingRoutes: [
    {
      en: {
        "house-for-rent": "house-for-rent"
      },
      tr: {
        "kiralik-ev": "house-for-rent"
      }
    }
  ],
  baseListingCountryRoutes: [
    {
      en: {
        turkey: 1,
        croatia: 2,
        montenegro: 3,
        "northean-cyprus": 4
      },
      tr: {
        turkiye: 1,
        hirvatistan: 2,
        karadag: 3,
        "kuzey-kibris": 4
      }
    }
  ],
  listingDetailSuffix: [
    {
      en: "detail",
      tr: "detay"
    }
  ],
  excludeKeys: [
    { tr: "detay" },
    { en: "detail" },
    { ru: "detal" },
    { hr: "detalj" }
  ]
};

export const allRoutes = [
  ...Route.authPagesRoutes,
  ...Route.textPagesRoutes,
  ...Route.staticPagesRoutes,
  ...Route.categoryRoutes,
  ...Route.baseListingRoutes
];
