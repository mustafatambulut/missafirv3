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
    const timeLineEntity = "api::timeline-step.timeline-step";
    const footerLinkEntity = "api::footer-link.footer-link";

    await destroyAll(entity);

    const partners = [];
    const partnerImages = ["https://svgshare.com/i/vHQ.svg", "https://svgshare.com/i/vL1.svg", "https://svgshare.com/i/vHQ.svg"];

    for (let i = 0; i < 20; i++) {
      partners.push(
        {
          image: partnerImages.map((image) => image)[Math.floor(Math.random() * partnerImages.length)],
          link: faker.internet.url(),
          label: faker.word.verb()
        }
      );
    }

    const benefits = [];
    for (let i = 0; i < 3; i++) {
      benefits.push(
        {
          image: "https://svgshare.com/i/vHM.svg",
          title: "In-house technology and world-class marketing",
          description: faker.lorem.paragraph()
        }
      );
    }

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
              label: "Become a homeowner",
              image: "https://svgshare.com/i/vAP.svg",
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
            languages: await strapi.db.query(languageEntity).findMany({}),
            publishedAt: new Date()
          }
        },
        body: [
          {
            __component: "sections.hero",
            image: "https://i.ibb.co/xq2vBny/hero.png",
            title: "Home wherever you go"
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
              title: "Best cities to discover",
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
            body: benefits
          },
          {
            __component: "sections.premium",
            header: {
              title: "Hearbeats & Happenings We Got You",
              description: faker.lorem.paragraph()
            },
            body: {
              title: faker.lorem.sentence(),
              image: "https://svgshare.com/i/voH.svg"
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
            __component: "sections.timeline",
            timeline_steps: await strapi.db.query(timeLineEntity).findMany({}),
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
              title: "Streamlined MissafirTech Experience",
              description: faker.lorem.paragraph()
            },
            body: [
              {
                title: faker.lorem.sentence(),
                image: "https://i.ibb.co/1MrZ78J/Group-114.png",
                description: faker.lorem.paragraph()
              },
              {
                title: faker.lorem.sentence(),
                image: "https://i.ibb.co/1MrZ78J/Group-114.png",
                description: faker.lorem.paragraph()
              },
              {
                title: faker.lorem.sentence(),
                image: "https://i.ibb.co/1MrZ78J/Group-114.png",
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
                header_image: "https://svgshare.com/i/vL0.svg",
                info: faker.lorem.paragraph(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                footer_desc: faker.lorem.paragraph(),
              },
              {
                header_label: faker.lorem.sentence(),
                header_image: "https://svgshare.com/i/vL0.svg",
                info: faker.lorem.paragraph(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                footer_desc: faker.lorem.paragraph(),
              },
              {
                header_label: faker.lorem.sentence(),
                header_image: "https://svgshare.com/i/vL0.svg",
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
            body: partners
          },
        ],
        footer: {
          header: {
            image: "https://www.missafir.com/wp-content/uploads/2022/12/logo-2.svg",
            description: faker.lorem.paragraph(),
            buttonImage: "https://svgshare.com/i/vAP.svg",
            buttonLabel: "Become a homeowner",
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

