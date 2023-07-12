const {faker} = require('@faker-js/faker');
const {destroyAll} = require("../helper");

module.exports = {
  async button(strapi) {
    const entity = "api::home.home";
    await destroyAll(entity);

    strapi.entityService.create(entity, {
      data: {
        header: {
          button: [
            {
              label: faker.word.verb(),
              image: faker.image.avatar(),
              link: faker.internet.url(),
              publishedAt: new Date()
            }
          ],
        }
      },
    });
    console.log("✓ Button")
  }
}

