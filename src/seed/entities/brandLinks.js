const {faker} = require('@faker-js/faker');
const {destroyAll} = require("../helper");

module.exports = {
  async brandLinks(strapi) {
    const entity = "api::brand-link.brand-link";
    await destroyAll(entity);

    for (let i = 0; i < 3; i++) {
      await strapi.entityService.create(entity, {
        data: {
          link: faker.internet.url(),
          label: faker.word.verb(),
          publishedAt: new Date()
        }
      })
    }
    console.log("✓ BrandLinks")
  }
}

