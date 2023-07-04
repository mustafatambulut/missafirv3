const {destroyAll} = require("../helper");

module.exports = {
  async languages(strapi) {
    const entity = "api::language.language";
    await destroyAll(entity);
    const langs = [
      {
        image: "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
        label: "TR",
        link: "https://www.missafir.com/tr",
      },
      {
        image: "https://ownerv2.missafir.com/assets/flags/english.svg",
        label: "EN",
        link: "https://www.missafir.com/en",
      },
      {
        image: "https://www.missafir.com/wp-content/uploads/2023/06/flag-montenegro.svg",
        label: "ME",
        link: "https://www.missafir.com/me",
      },
    ];

    for (const {image, label, link} of langs) {
      await strapi.entityService.create(entity, {
        data: {
          image,
          label,
          link,
          publishedAt: new Date()
        }
      })
    }
    console.log("✓ Languages");
  }
}

