const {faker} = require('@faker-js/faker');
const {destroyAll} = require("../helper");

module.exports = {
  async userLinks(strapi) {
    const entity = "api::user-link.user-link";
    await destroyAll(entity);

    for (let i = 0; i < 3; i++) {
      await strapi.entityService.create(entity, {
        data: {
          image: faker.image.avatar(),
          label: faker.person.firstName(),
          value: faker.person.firstName(),
          link: faker.internet.url(),
          publishedAt: new Date()
        }
      })
    }
    console.log("✓ UserLinks");
  }
}

