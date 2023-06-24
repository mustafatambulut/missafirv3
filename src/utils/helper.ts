import { find, get } from "lodash";
import { getMenu, getPage } from "@/service";
import { ILink } from "@/components/molecules/menu/types";

interface IMenu {
  parent: {
    data: object;
  };
}

export const getMenuByComponent: any = async (component: string) => {
  const res = await getMenu();
  const menuData: IMenu | undefined = find<IMenu>(res, (menu: IMenu) => {
    return get(menu, "attributes.title") === component;
  });
  return get(menuData, "attributes.items.data");
};

export const getPageDataByComponent: any = async (
  page: string,
  component: string
) => {
  const { attributes } = await getPage();
  return find(get(attributes, "home"), {
    __component: component
  });
};

export const getDummyDataByType = (type: string) => {
  const dummyItems = {
    dummyMenuItems: [
      {
        id: 1,
        attributes: {
          order: 1,
          title: "Solutions",
          url: "#",
          target: "_blank",
          createdAt: "created0",
          updatedAt: "updated0",
          children: {
            data: [
              {
                id: 12,
                attributes: {
                  order: 1,
                  title: "For Guests",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 123,
                attributes: {
                  order: 1,
                  title: "For Owners",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 124,
                attributes: {
                  order: 1,
                  title: "For Businesses",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              }
            ]
          }
        }
      },
      {
        id: 2,
        attributes: {
          order: 1,
          title: "Services",
          url: "#",
          target: "_blank",
          createdAt: "created0",
          updatedAt: "updated0",
          children: {
            data: [
              {
                id: 12,
                attributes: {
                  order: 1,
                  title: "Missafir Tech",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 123,
                attributes: {
                  order: 1,
                  title: "Missafir Design",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 124,
                attributes: {
                  order: 1,
                  title: "Advisor",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 125,
                attributes: {
                  order: 1,
                  title: "Greem",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 126,
                attributes: {
                  order: 1,
                  title: "Invite & Earn",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              }
            ]
          }
        }
      },
      {
        id: 3,
        attributes: {
          order: 1,
          title: "Company",
          url: "#",
          target: "_blank",
          createdAt: "created0",
          updatedAt: "updated0",
          children: {
            data: [
              {
                id: 121,
                attributes: {
                  order: 1,
                  title: "Meet the Team",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 1202,
                attributes: {
                  order: 1,
                  title: "Life at Missafir",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 1242,
                attributes: {
                  order: 1,
                  title: "Sustainability",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 12429,
                attributes: {
                  order: 1,
                  title: "Blog",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              }
            ]
          }
        }
      },
      {
        id: 4,
        attributes: {
          order: 1,
          title: "Support",
          url: "#",
          target: "_blank",
          createdAt: "created0",
          updatedAt: "updated0",
          children: {
            data: [
              {
                id: 122229,
                attributes: {
                  order: 1,
                  title: "Contact",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              },
              {
                id: 12355443,
                attributes: {
                  order: 1,
                  title: "FAQ",
                  url: "#",
                  target: "_blank",
                  createdAt: "created0",
                  updatedAt: "updated0",
                  children: {
                    data: []
                  }
                }
              }
            ]
          }
        }
      }
    ],
    dummyNavbarItems: {
      logo: {
        data: {
          id: 7,
          attributes: {
            name: "logo-2.svg",
            alternativeText: null,
            caption: null,
            width: 570,
            height: 97,
            formats: null,
            hash: "logo_2_bfcd17cc2b",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 7.1,
            url: "images/missafir-logo.svg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2023-05-13T10:52:30.817Z",
            updatedAt: "2023-05-22T19:29:24.954Z"
          }
        }
      },
      button: {
        id: 32,
        label: "Become a homeower ",
        url: "https://homes.missafir.com/",
        iconSrc: null
      },
      languages: [
        {
          id: 33,
          label: "TR",
          value: "tr",
          url: null,
          iconSrc: "/images/flags/turkish.svg"
        },
        {
          id: 34,
          label: "ME",
          value: "me",
          url: null,
          iconSrc: "/images/flags/montenegrin.svg"
        },
        {
          id: 35,
          label: "EN",
          value: "en",
          url: null,
          iconSrc: "/images/flags/english.svg"
        }
      ]
    }
  };
  return get(dummyItems, `[${type}]`);
};
