import get from "lodash/get";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getLocations } from "@/service/api";
import { LOCATIONS_KEY } from "@/app/constants";
import { getCurrentLang, setLocalStorage } from "@/utils/helper";
import { ILandingState } from "@/redux/features/landingSlice/types";
import { ILocationData } from "@/components/atoms/destinationSelect/types";

export const fetchDataByPage = createAsyncThunk(
  "landing/fetchDataByPage",
  async () => {
    //@ts-ignore
    const res = await import(
      `../../../../public/data/home_${getCurrentLang()}.json`
    );
    return get(JSON.parse(JSON.stringify(res)), "data.attributes");
  }
);

export const fetchLocations = createAsyncThunk(
  "landing/fetchLocations",
  async () => {
    const { data } = await getLocations();
    return data.data;
  }
);

const initialState = {
  hero: null,
  entities: [],
  loading: true,
  isShowDrawer: false,
  locations: {},
  activePath: "/",
  isMinifyButtons: false,
  isShowHeaderButtons: true,
  headerData: {
    en: {
      id: 6,
      logo: {
        id: 6,
        image:
          "https://strapi-aws-s3-images-bucket-v1.s3.eu-central-1.amazonaws.com/missafir_logo_white_cd2032209a.svg",
        link: "/"
      },
      userMenu: {
        id: 4,
        image:
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1182.jpg",
        user_links: {
          data: []
        }
      },
      buttons: [
        {
          id: 15,
          label: "Rent my home",
          image:
            "https://missafir-dev.s3.eu-central-1.amazonaws.com/missafir/missafirv3/heart-icon.svg",
          link: "/en/get-an-offer"
        }
      ],
      languageMenu: {
        id: 4,
        languages: {
          data: [
            {
              id: 4,
              attributes: {
                image: "https://ownerv2.missafir.com/assets/flags/english.svg",
                label: "EN",
                link: "https://www.missafir.com/en",
                value: "en",
                createdAt: "2023-09-05T11:24:55.131Z",
                updatedAt: "2023-09-05T11:24:55.978Z",
                publishedAt: "2023-09-05T11:24:55.972Z"
              }
            },
            {
              id: 6,
              attributes: {
                image:
                  "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
                label: "TR",
                link: "https://www.missafir.com/tr",
                value: "tr",
                createdAt: "2023-09-05T11:25:39.454Z",
                updatedAt: "2023-09-05T11:25:41.675Z",
                publishedAt: "2023-09-05T11:25:41.669Z"
              }
            }
          ]
        }
      }
    },
    tr: {
      id: 5,
      logo: {
        id: 5,
        image:
          "https://strapi-aws-s3-images-bucket-v1.s3.eu-central-1.amazonaws.com/missafir_logo_white_cd2032209a.svg",
        link: "/"
      },
      userMenu: {
        id: 3,
        image:
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1182.jpg",
        user_links: {
          data: []
        }
      },
      buttons: [
        {
          id: 13,
          label: "Evimi kirala",
          image:
            "https://missafir-dev.s3.eu-central-1.amazonaws.com/missafir/missafirv3/heart-icon.svg",
          link: "/tr/teklif-al"
        }
      ],
      languageMenu: {
        id: 3,
        languages: {
          data: [
            {
              id: 6,
              attributes: {
                image:
                  "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
                label: "TR",
                link: "https://www.missafir.com/tr",
                value: "tr",
                createdAt: "2023-09-05T11:25:39.454Z",
                updatedAt: "2023-09-05T11:25:41.675Z",
                publishedAt: "2023-09-05T11:25:41.669Z"
              }
            },
            {
              id: 4,
              attributes: {
                image: "https://ownerv2.missafir.com/assets/flags/english.svg",
                label: "EN",
                link: "https://www.missafir.com/en",
                value: "en",
                createdAt: "2023-09-05T11:24:55.131Z",
                updatedAt: "2023-09-05T11:24:55.978Z",
                publishedAt: "2023-09-05T11:24:55.972Z"
              }
            }
          ]
        }
      }
    }
  },
  footerData: {
    en: {
      id: 4,
      header: {
        id: 4,
        image:
          "https://missafir-dev.s3.eu-central-1.amazonaws.com/missafir/missafirv3/missafir_logo.svg",
        description:
          "Turkey\u2019s leading brand in professional property management and short-term rentals.",
        buttonImage:
          "https://missafir-dev.s3.eu-central-1.amazonaws.com/missafir/missafirv3/heart-icon.svg",
        buttonLabel: "Rent my home",
        buttonLink: "/en/get-an-offer"
      },
      body: [
        {
          id: 4,
          title: "MISSAFIR",
          menu_links: {
            data: [
              {
                id: 27,
                attributes: {
                  label: "For Owners",
                  link: "/en/get-an-offer",
                  createdAt: "2023-09-28T07:19:42.098Z",
                  updatedAt: "2023-09-29T14:52:59.004Z",
                  publishedAt: "2023-09-28T07:19:43.192Z"
                }
              },
              {
                id: 26,
                attributes: {
                  label: "For Guests",
                  link: "/en/list",
                  createdAt: "2023-09-28T07:19:25.885Z",
                  updatedAt: "2023-09-29T14:52:36.808Z",
                  publishedAt: "2023-09-28T07:19:27.185Z"
                }
              }
            ]
          }
        },
        {
          id: 6,
          title: "DESTINATIONS",
          menu_links: {
            data: [
              {
                id: 28,
                attributes: {
                  label: "Antalya",
                  link: "/en/antalya",
                  createdAt: "2023-09-28T07:20:27.905Z",
                  updatedAt: "2023-09-28T08:23:01.113Z",
                  publishedAt: "2023-09-28T07:20:29.092Z"
                }
              },
              {
                id: 29,
                attributes: {
                  label: "Istanbul",
                  link: "/en/istanbul",
                  createdAt: "2023-09-28T07:20:39.296Z",
                  updatedAt: "2023-09-29T14:54:01.205Z",
                  publishedAt: "2023-09-28T07:20:40.388Z"
                }
              },
              {
                id: 30,
                attributes: {
                  label: "Croatia",
                  link: "/en/house-for-rent/croatia",
                  createdAt: "2023-09-28T07:21:02.702Z",
                  updatedAt: "2023-09-29T14:54:08.297Z",
                  publishedAt: "2023-09-28T07:21:04.000Z"
                }
              },
              {
                id: 31,
                attributes: {
                  label: "Montenegro",
                  link: "/en/house-for-rent/montenegro",
                  createdAt: "2023-09-28T07:21:10.597Z",
                  updatedAt: "2023-09-29T14:54:16.510Z",
                  publishedAt: "2023-09-28T07:21:11.691Z"
                }
              },
              {
                id: 32,
                attributes: {
                  label: "Bodrum",
                  link: "/en/mugla/bodrum",
                  createdAt: "2023-09-28T07:21:27.285Z",
                  updatedAt: "2023-09-29T14:54:23.124Z",
                  publishedAt: "2023-09-28T07:21:28.487Z"
                }
              }
            ]
          }
        },
        {
          id: 5,
          title: "SERVICES",
          menu_links: {
            data: [
              {
                id: 36,
                attributes: {
                  label: "Our Packages",
                  link: "/en/our-packages",
                  createdAt: "2023-09-28T07:25:14.391Z",
                  updatedAt: "2023-09-29T14:54:58.702Z",
                  publishedAt: "2023-09-28T07:25:15.406Z"
                }
              },
              {
                id: 33,
                attributes: {
                  label: "MissafirTech",
                  link: "https://missafir.io",
                  createdAt: "2023-09-28T07:22:35.119Z",
                  updatedAt: "2023-09-29T14:54:30.122Z",
                  publishedAt: "2023-09-28T07:22:36.295Z"
                }
              },
              {
                id: 34,
                attributes: {
                  label: "Interior Design",
                  link: "https://missafir.design",
                  createdAt: "2023-09-28T07:22:49.017Z",
                  updatedAt: "2023-09-29T14:54:38.399Z",
                  publishedAt: "2023-09-28T07:22:49.992Z"
                }
              },
              {
                id: 15,
                attributes: {
                  label: "Referral program",
                  link: "/en/referral-program",
                  createdAt: "2023-09-05T11:28:20.759Z",
                  updatedAt: "2023-09-29T14:50:39.804Z",
                  publishedAt: "2023-09-05T11:28:21.472Z"
                }
              },
              {
                id: 52,
                attributes: {
                  label: "Advisor",
                  link: "https://advisor.missafir.com",
                  createdAt: "2023-09-28T08:21:31.005Z",
                  updatedAt: "2023-09-28T08:22:10.516Z",
                  publishedAt: "2023-09-28T08:21:36.608Z"
                }
              }
            ]
          }
        },
        {
          id: 7,
          title: "COMPANY",
          menu_links: {
            data: [
              {
                id: 16,
                attributes: {
                  label: "Meet the Team",
                  link: "/en/about-us",
                  createdAt: "2023-09-05T11:27:49.741Z",
                  updatedAt: "2023-09-29T14:50:36.332Z",
                  publishedAt: "2023-09-05T11:27:50.572Z"
                }
              },
              {
                id: 37,
                attributes: {
                  label: "Life at Missafir",
                  link: "/en/alive-with-missafir",
                  createdAt: "2023-09-28T07:27:11.998Z",
                  updatedAt: "2023-09-29T14:55:06.794Z",
                  publishedAt: "2023-09-28T07:27:12.912Z"
                }
              },
              {
                id: 38,
                attributes: {
                  label: "Sustainability",
                  link: "/en/sustainability",
                  createdAt: "2023-09-28T07:27:36.202Z",
                  updatedAt: "2023-09-29T14:55:15.116Z",
                  publishedAt: "2023-09-28T07:27:37.104Z"
                }
              },
              {
                id: 25,
                attributes: {
                  label: "Blog",
                  link: "https://missafir.com/en/blog",
                  createdAt: "2023-09-22T11:42:57.876Z",
                  updatedAt: "2023-09-23T10:12:29.080Z",
                  publishedAt: "2023-09-22T11:43:26.790Z"
                }
              }
            ]
          }
        },
        {
          id: 8,
          title: "SUPPORT",
          menu_links: {
            data: [
              {
                id: 17,
                attributes: {
                  label: "Contact",
                  link: "/en/contact",
                  createdAt: "2023-09-22T11:32:45.820Z",
                  updatedAt: "2023-09-29T14:51:16.495Z",
                  publishedAt: "2023-09-22T11:43:24.697Z"
                }
              },
              {
                id: 23,
                attributes: {
                  label: "FAQ",
                  link: "/en/faq",
                  createdAt: "2023-09-22T11:43:16.171Z",
                  updatedAt: "2023-09-23T10:08:42.890Z",
                  publishedAt: "2023-09-22T11:43:22.278Z"
                }
              },
              // {
              //   id: 22,
              //   attributes: {
              //     label: "Privacy Policy",
              //     link: "/en/privacy-policy",
              //     createdAt: "2023-09-22T13:57:45.541Z",
              //     updatedAt: "2023-09-28T08:07:48.596Z",
              //     publishedAt: "2023-09-22T13:57:46.414Z"
              //   }
              // },
              // {
              //   id: 23,
              //   attributes: {
              //     label: "KVKK",
              //     link: "/en/kvkk-aydinlatma-metni",
              //     createdAt: "2023-09-22T13:57:45.541Z",
              //     updatedAt: "2023-09-28T08:07:48.596Z",
              //     publishedAt: "2023-09-22T13:57:46.414Z"
              //   }
              // }
            ]
          }
        }
      ],
      footer: {
        id: 1,
        footer_links: {
          data: []
        }
      }
    },
    tr: {
      id: 3,
      header: {
        id: 3,
        image:
          "https://missafir-dev.s3.eu-central-1.amazonaws.com/missafir/missafirv3/missafir_logo.svg",
        description:
          "Profesyonel mülk yönetimi ve kısa dönem ev ve villa kiralamada Türkiye’nin öncü markası. ",
        buttonImage:
          "https://missafir-dev.s3.eu-central-1.amazonaws.com/missafir/missafirv3/heart-icon.svg",
        buttonLabel: "Evimi kirala",
        buttonLink: "/teklif-al"
      },
      body: [
        {
          id: 3,
          title: "MİSSAFİR",
          menu_links: {
            data: [
              {
                id: 39,
                attributes: {
                  label: "Ev Sahipleri",
                  link: "/teklif-al",
                  createdAt: "2023-09-28T07:55:28.386Z",
                  updatedAt: "2023-10-01T11:27:14.103Z",
                  publishedAt: "2023-09-28T07:55:38.621Z"
                }
              },
              {
                id: 40,
                attributes: {
                  label: "Misafirler",
                  link: "/list",
                  createdAt: "2023-09-28T07:55:57.891Z",
                  updatedAt: "2023-09-29T14:56:02.699Z",
                  publishedAt: "2023-09-28T07:55:59.786Z"
                }
              }
            ]
          }
        },
        {
          id: 9,
          title: "BÖLGELER",
          menu_links: {
            data: [
              {
                id: 41,
                attributes: {
                  label: "Antalya",
                  link: "/antalya",
                  createdAt: "2023-09-28T07:57:22.017Z",
                  updatedAt: "2023-09-29T14:56:13.610Z",
                  publishedAt: "2023-09-28T07:57:22.995Z"
                }
              },
              {
                id: 42,
                attributes: {
                  label: "İstanbul",
                  link: "/istanbul",
                  createdAt: "2023-09-28T07:57:51.693Z",
                  updatedAt: "2023-09-29T14:56:19.701Z",
                  publishedAt: "2023-09-28T07:57:53.615Z"
                }
              },
              {
                id: 43,
                attributes: {
                  label: "Hırvatistan",
                  link: "/kiralik-ev/hirvatistan",
                  createdAt: "2023-09-28T07:58:04.997Z",
                  updatedAt: "2023-09-29T14:56:28.006Z",
                  publishedAt: "2023-09-28T07:58:06.094Z"
                }
              },
              {
                id: 44,
                attributes: {
                  label: "Karadağ",
                  link: "/kiralik-ev/karadag",
                  createdAt: "2023-09-28T07:58:15.701Z",
                  updatedAt: "2023-09-29T14:56:35.619Z",
                  publishedAt: "2023-09-28T07:58:16.685Z"
                }
              },
              {
                id: 32,
                attributes: {
                  label: "Bodrum",
                  link: "/bodrum",
                  createdAt: "2023-09-28T07:21:27.285Z",
                  updatedAt: "2023-09-29T14:54:23.124Z",
                  publishedAt: "2023-09-28T07:21:28.487Z"
                }
              }
            ]
          }
        },
        {
          id: 10,
          title: "HİZMETLER",
          menu_links: {
            data: [
              {
                id: 46,
                attributes: {
                  label: "Hizmetlerimiz",
                  link: "/hizmet-paketlerimiz",
                  createdAt: "2023-09-28T08:00:22.294Z",
                  updatedAt: "2023-09-29T14:56:48.589Z",
                  publishedAt: "2023-09-28T08:00:23.415Z"
                }
              },
              {
                id: 33,
                attributes: {
                  label: "MissafirTech",
                  link: "https://missafir.io",
                  createdAt: "2023-09-28T07:22:35.119Z",
                  updatedAt: "2023-09-29T14:54:30.122Z",
                  publishedAt: "2023-09-28T07:22:36.295Z"
                }
              },
              {
                id: 48,
                attributes: {
                  label: "İç Dekorasyon",
                  link: "https://missafir.design",
                  createdAt: "2023-09-28T08:02:05.200Z",
                  updatedAt: "2023-09-29T14:57:03.402Z",
                  publishedAt: "2023-09-28T08:02:06.324Z"
                }
              },
              {
                id: 49,
                attributes: {
                  label: "Referans Programı",
                  link: "/referans-programi",
                  createdAt: "2023-09-28T08:02:19.399Z",
                  updatedAt: "2023-09-29T14:57:10.835Z",
                  publishedAt: "2023-09-28T08:02:22.194Z"
                }
              }
            ]
          }
        },
        {
          id: 11,
          title: "HAKKINDA",
          menu_links: {
            data: [
              {
                id: 24,
                attributes: {
                  label: "Biz Kimiz?",
                  link: "/biz-kimiz",
                  createdAt: "2023-09-22T13:59:41.784Z",
                  updatedAt: "2023-09-28T08:04:21.526Z",
                  publishedAt: "2023-09-22T13:59:42.751Z"
                }
              },
              {
                id: 50,
                attributes: {
                  label: "Missafir'de Yaşam",
                  link: "/missafirde-yasam",
                  createdAt: "2023-09-28T08:05:59.509Z",
                  updatedAt: "2023-09-28T08:06:02.093Z",
                  publishedAt: "2023-09-28T08:06:02.088Z"
                }
              },
              {
                id: 51,
                attributes: {
                  label: "Sürdürülebilirlik",
                  link: "/surdurulebilirlik",
                  createdAt: "2023-09-28T08:06:20.401Z",
                  updatedAt: "2023-09-28T08:06:21.767Z",
                  publishedAt: "2023-09-28T08:06:21.762Z"
                }
              },
              {
                id: 25,
                attributes: {
                  label: "Blog",
                  link: "https://missafir.com/blog",
                  createdAt: "2023-09-22T11:42:57.876Z",
                  updatedAt: "2023-09-23T10:12:29.080Z",
                  publishedAt: "2023-09-22T11:43:26.790Z"
                }
              }
            ]
          }
        },
        {
          id: 12,
          title: "DESTEK",
          menu_links: {
            data: [
              {
                id: 19,
                attributes: {
                  label: "İletişim",
                  link: "/iletisim",
                  createdAt: "2023-09-22T13:57:26.292Z",
                  updatedAt: "2023-09-29T14:51:46.728Z",
                  publishedAt: "2023-09-22T13:57:28.266Z"
                }
              },
              {
                id: 20,
                attributes: {
                  label: "SSS",
                  link: "/sikca-sorulan-sorular",
                  createdAt: "2023-09-22T13:57:45.541Z",
                  updatedAt: "2023-09-28T08:07:48.596Z",
                  publishedAt: "2023-09-22T13:57:46.414Z"
                }
              },
              {
                id: 22,
                attributes: {
                  label: "Gizlilik Politikası",
                  link: "/gizlilik-politikasi",
                  createdAt: "2023-09-22T13:57:45.541Z",
                  updatedAt: "2023-09-28T08:07:48.596Z",
                  publishedAt: "2023-09-22T13:57:46.414Z"
                }
              },
              {
                id: 23,
                attributes: {
                  label: "KVKK",
                  link: "/kvkk-aydinlatma-metni",
                  createdAt: "2023-09-22T13:57:45.541Z",
                  updatedAt: "2023-09-28T08:07:48.596Z",
                  publishedAt: "2023-09-22T13:57:46.414Z"
                }
              }
            ]
          }
        }
      ],
      footer: null
    }
  },
  footerBrandData: {
    en: {
      id: 4,
      header: {
        id: 67,
        title: "\u00A92023 MSFR Technology and Consulting Inc. ",
        description: "All rights reserved.",
        image: null
      },
      body: {
        id: 4,
        brand_links: {
          data: []
        }
      }
    },
    tr: {
      id: 3,
      header: {
        id: 56,
        title: "©2023 MSFR Teknoloji ve Danışmanlık A.Ş.",
        description: "Tüm hakları saklıdır.",
        image: null
      },
      body: {
        id: 3,
        brand_links: {
          data: []
        }
      }
    }
  }
} as ILandingState;

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    updateIsMinifyButtons: (
      state: { isMinifyButtons?: boolean },
      action: PayloadAction<boolean>
    ) => {
      state.isMinifyButtons = action.payload;
    },
    updateIsShowHeaderButtons: (
      state: { isShowHeaderButtons?: boolean },
      action: PayloadAction<boolean>
    ) => {
      state.isShowHeaderButtons = action.payload;
    },
    updateActivePath: (
      state: { activePath?: string },
      action: PayloadAction<boolean>
    ) => {
      state.activePath = action.payload;
    },
    updateIsShowDrawer: (
      state: { isShowDrawer: boolean },
      action: PayloadAction<boolean>
    ) => {
      state.isShowDrawer = action.payload;
    },
    updateLocations: (
      state: { locations: any },
      action: PayloadAction<ILocationData>
    ) => {
      state.locations = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataByPage.pending, (state: ILandingState): void => {
      state.loading = true;
    });
    builder.addCase(
      fetchDataByPage.fulfilled,
      (state: ILandingState, action) => {
        state.entities = [];
        get(state, "entities").push(get(action, "payload"));
        state.loading = false;
      }
    );
    builder.addCase(
      fetchLocations.fulfilled,
      (state: ILandingState, action) => {
        state.locations = action.payload;
        setLocalStorage(LOCATIONS_KEY, JSON.stringify(action.payload));
      }
    );
  }
});

export const {
  updateIsShowDrawer,
  updateLocations,
  updateActivePath,
  updateIsMinifyButtons,
  updateIsShowHeaderButtons
} = landingSlice.actions;
export default landingSlice.reducer;
