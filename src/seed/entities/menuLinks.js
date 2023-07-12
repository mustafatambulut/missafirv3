const {faker} = require('@faker-js/faker');
const {destroyAll} = require("../helper");

module.exports = {
  async menuLinks(strapi) {
    const entity = "api::menu-link.menu-link";
    await destroyAll(entity);

    for (let i = 0; i < 3; i++) {
      await strapi.entityService.create(entity, {
        data: {
          label: faker.word.verb(),
          link: faker.internet.url(),
          publishedAt: new Date()
        }
      })
    }
    console.log("✓ MenuLinks")
  }
}

