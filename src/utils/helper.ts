import { find, get } from "lodash";
import { getMenu, getPage } from "@/service";

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
        id: 1,
        link: "/",
        image: "images/missafir-logo.svg"
      },
      button: [
        {
          id: 2,
          image: "",
          label: "Become a homeower",
          link: "https://homes.missafir.com/"
        }
      ],
      langMenu: {
        id: 4,
        image: null,
        links: {
          data: [
            {
              id: 2,
              attributes: {
                label: "en",
                createdAt: "2023-06-26T08:27:36.676Z",
                updatedAt: "2023-06-26T10:34:37.660Z",
                publishedAt: "2023-06-26T08:27:37.274Z",
                link: "http://localhost:3000/en",
                image: "/images/flags/english.svg",
                value: "en"
              }
            },
            {
              id: 3,
              attributes: {
                label: "me",
                createdAt: "2023-06-26T08:28:06.017Z",
                updatedAt: "2023-06-26T10:34:50.534Z",
                publishedAt: "2023-06-26T08:28:06.571Z",
                link: "http://localhost:3000/me",
                image: "/images/flags/montenegrin.svg",
                value: "me"
              }
            },
            {
              id: 1,
              attributes: {
                label: "tr",
                createdAt: "2023-06-26T08:24:58.860Z",
                updatedAt: "2023-06-26T10:34:09.958Z",
                publishedAt: "2023-06-26T08:27:17.551Z",
                link: "http://localhost:3000/tr",
                image: "/images/flags/turkish.svg",
                value: "tr"
              }
            }
          ]
        }
      },
      userMenu: {
        id: 5,
        image: "",
        links: {
          data: [
            {
              id: 5,
              attributes: {
                label: "Sign in",
                createdAt: "2023-06-26T09:23:49.032Z",
                updatedAt: "2023-06-26T09:24:39.220Z",
                publishedAt: "2023-06-26T09:24:39.216Z",
                link: "http://localhost:3000/login",
                image: null,
                value: null
              }
            },
            {
              id: 6,
              attributes: {
                label: "Sign up",
                createdAt: "2023-06-26T09:24:25.989Z",
                updatedAt: "2023-06-26T09:24:26.581Z",
                publishedAt: "2023-06-26T09:24:26.577Z",
                link: "http://localhost:3000/register",
                image: null,
                value: null
              }
            }
          ]
        }
      }
    }
  };
  // const denemeDummy = {
  //   data: {
  //     id: 1,
  //     attributes: {
  //       createdAt: "2023-06-26T08:26:48.909Z",
  //       updatedAt: "2023-06-26T18:35:10.101Z",
  //       publishedAt: "2023-06-26T08:28:19.300Z",
  //       header: {
  //         id: 1,
  //         logo: {
  //           id: 1,
  //           link: "http://localhost:3000",
  //           image:
  //             "https://www.missafir.com/wp-content/uploads/2022/12/logo-2.svg"
  //         },
  //         langMenu: {
  //           id: 4,
  //           image: null,
  //           links: {
  //             data: [
  //               {
  //                 id: 2,
  //                 attributes: {
  //                   label: "en",
  //                   createdAt: "2023-06-26T08:27:36.676Z",
  //                   updatedAt: "2023-06-26T10:34:37.660Z",
  //                   publishedAt: "2023-06-26T08:27:37.274Z",
  //                   link: "http://localhost:3000/en",
  //                   image:
  //                     "https://ownerv2.missafir.com/assets/flags/english.svg",
  //                   value: "en"
  //                 }
  //               },
  //               {
  //                 id: 3,
  //                 attributes: {
  //                   label: "me",
  //                   createdAt: "2023-06-26T08:28:06.017Z",
  //                   updatedAt: "2023-06-26T10:34:50.534Z",
  //                   publishedAt: "2023-06-26T08:28:06.571Z",
  //                   link: "http://localhost:3000/me",
  //                   image:
  //                     "https://ownerv2.missafir.com/assets/flags/montenegrin.svg",
  //                   value: "me"
  //                 }
  //               },
  //               {
  //                 id: 1,
  //                 attributes: {
  //                   label: "tr",
  //                   createdAt: "2023-06-26T08:24:58.860Z",
  //                   updatedAt: "2023-06-26T10:34:09.958Z",
  //                   publishedAt: "2023-06-26T08:27:17.551Z",
  //                   link: "http://localhost:3000/tr",
  //                   image:
  //                     "https://ownerv2.missafir.com/assets/flags/turkish.svg",
  //                   value: "tr"
  //                 }
  //               }
  //             ]
  //           }
  //         },
  //         userMenu: {
  //           id: 5,
  //           image:
  //             "https://img.icons8.com/?size=512&id=vrjuWgj4Ipxl&format=png",
  //           links: {
  //             data: [
  //               {
  //                 id: 5,
  //                 attributes: {
  //                   label: "Sign in",
  //                   createdAt: "2023-06-26T09:23:49.032Z",
  //                   updatedAt: "2023-06-26T09:24:39.220Z",
  //                   publishedAt: "2023-06-26T09:24:39.216Z",
  //                   link: "http://localhost:3000/login",
  //                   image: null,
  //                   value: null
  //                 }
  //               },
  //               {
  //                 id: 6,
  //                 attributes: {
  //                   label: "Sign up",
  //                   createdAt: "2023-06-26T09:24:25.989Z",
  //                   updatedAt: "2023-06-26T09:24:26.581Z",
  //                   publishedAt: "2023-06-26T09:24:26.577Z",
  //                   link: "http://localhost:3000/register",
  //                   image: null,
  //                   value: null
  //                 }
  //               }
  //             ]
  //           }
  //         },
  //         button: [
  //           {
  //             id: 2,
  //             image:
  //               "https://cdn-icons-png.flaticon.com/512/10263/10263030.png",
  //             label: "test button",
  //             link: "http://localhost:3000/test"
  //           }
  //         ]
  //       },
  //       Body: [
  //         {
  //           id: 2,
  //           __component: "sections.hero",
  //           image:"/images/hero-image.png",
  //           title: "Home wherever you go"
  //         },
  //         {
  //           id: 1,
  //           __component: "sections.summary",
  //           header: {
  //             id: 2,
  //             title: "A Brief Summary of Our Processes",
  //             description:
  //               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
  //           },
  //           body: null
  //         },
  //         {
  //           id: 3,
  //           __component: "sections.benefit-guest",
  //           header: {
  //             id: 3,
  //             title: "Best cities to discover",
  //             description:
  //               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n"
  //           }
  //         },
  //         {
  //           id: 3,
  //           __component: "sections.cities",
  //           header: {
  //             id: 4,
  //             title: "cities title",
  //             description:
  //               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n"
  //           },
  //           body: {
  //             id: 3
  //           }
  //         }
  //       ],
  //       footer: []
  //     }
  //   },
  //   meta: {}
  // };
  return get(dummyItems, `[${type}]`);
};

export const isMobileView = () => {
  "use client";
  return get(window, "screen.width") <= 600;
};
