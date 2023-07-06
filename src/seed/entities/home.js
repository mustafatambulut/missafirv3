const {faker} = require('@faker-js/faker');
const {destroyAll} = require("../helper");

module.exports = {
  async home(strapi) {
    const entity = "api::home.home";
    const cityEntity = "api::city.city";
    const languageEntity = "api::language.language";
    const userLinkEntity = "api::user-link.user-link";
    const menuLinkEntity = "api::menu-link.menu-link";
    const brandLinkEntity = "api::brand-link.brand-link";
    const footerLinkEntity = "api::footer-link.footer-link";

    await destroyAll(entity);

    strapi.entityService.create(entity, {
      data: {
        header: {
          logo: {
            image: "https://www.missafir.com/wp-content/uploads/2022/12/logo-2.svg",
            link: "http://localhost:3000",
            publishedAt: new Date()
          },
          buttons: [
            {
              label: faker.word.verb(),
              image: faker.image.avatar(),
              link: faker.internet.url(),
              publishedAt: new Date()
            }
          ],
          userMenu: {
            image: faker.image.avatar(),
            user_links: await strapi.db.query(userLinkEntity).findMany({}),
            publishedAt: new Date()
          },
          languageMenu: {
            image: faker.image.avatar(),
            languages: await strapi.db.query(languageEntity).findMany({}),
            publishedAt: new Date()
          }
        },
        body: [
          {
            __component: "sections.hero",
            image: faker.image.avatar(),
            title: faker.lorem.sentence()
          },
          {
            __component: "sections.benefit-guest",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            }
          },
          {
            __component: "sections.cities",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            cities: await strapi.db.query(cityEntity).findMany({})
          },
          {
            __component: "sections.benefit-owner",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            body: [
              {
                image: faker.image.avatar(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph()
              }
            ]
          },
          {
            __component: "sections.premium",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            body: {
              title: faker.lorem.sentence(),
              image: faker.image.avatar()
            },
            footer: {
              label: faker.word.verb(),
              image: faker.image.avatar(),
              link: faker.internet.url(),
            }
          },
          {
            __component: "sections.banner",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            body: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            footer: {
              label: faker.word.verb(),
              image: faker.image.avatar(),
              link: faker.internet.url(),
            }
          },
          {
            __component: "sections.potential-income",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            body: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            footer: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            }
          },
          {
            __component: "sections.summary",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            body: {
              image: faker.image.avatar(),
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph(),
              buttonName: faker.lorem.word(),
              buttonLink: faker.internet.url(),
              buttonImage: faker.image.avatar()
            }
          },
          {
            __component: "sections.tech-experience",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            body: [
              {
                title: faker.lorem.sentence(),
                image: faker.image.avatar(),
                description: faker.lorem.paragraph()
              }
            ]
          },
          {
            __component: "sections.testemonial",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            body: [
              {
                header_label: faker.lorem.sentence(),
                header_image: faker.image.avatar(),
                info: faker.lorem.paragraph(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                footer_desc: faker.lorem.paragraph(),
              }
            ]
          },
          {
            __component: "sections.partners",
            header: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph()
            },
            body: [
              {
                image: faker.image.avatar(),
                link: faker.internet.url(),
                label: faker.word.verb(),
              }
            ]
          },
        ],
        footer: {
          header: {
            image: faker.image.avatar(),
            description: faker.lorem.paragraph(),
            buttonImage: faker.image.avatar(),
            buttonLabel: faker.lorem.word(),
            buttonLink: faker.internet.url()
          },
          body: [
            {
              title: faker.lorem.sentence(),
              menu_links: await strapi.db.query(menuLinkEntity).findMany({}),
            }
          ],
          footer: {
            footer_links: await strapi.db.query(footerLinkEntity).findMany({}),
          }
        },
        footerBrand: {
          header: {
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
          },
          body: {
            brand_links: await strapi.db.query(brandLinkEntity).findMany({}),
          }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
      },
    });
    console.log("✓ Home")
  }
}

