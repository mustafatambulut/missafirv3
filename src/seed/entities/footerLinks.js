const {faker} = require('@faker-js/faker');
const {destroyAll} = require("../helper");

module.exports = {
  async footerLinks(strapi) {
    const entity = "api::footer-link.footer-link";
    await destroyAll(entity);

    for (let i = 0; i < 3; i++) {
      await strapi.entityService.create(entity, {
        data: {
          link: faker.internet.url(),
          image: faker.image.avatar(),
          publishedAt: new Date()
        }
      })
    }
    console.log("✓ FooterLinks")
  }
}

