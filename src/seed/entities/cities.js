const {faker} = require('@faker-js/faker');
const {destroyAll} = require("../helper");

module.exports = {
  async cities(strapi) {
    const entity = "api::city.city";
    await destroyAll(entity);

    for (let i = 0; i < 3; i++) {
      await strapi.entityService.create(entity, {
        data: {
          title: faker.location.city(),
          image: faker.image.avatarGitHub(),
          description: faker.lorem.paragraph(),
          publishedAt: new Date()
        }
      })
    }
    console.log("✓ Cities");
  }
}

