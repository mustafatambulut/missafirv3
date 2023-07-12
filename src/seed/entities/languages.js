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
        value: "TR",
      },
      {
        image: "https://ownerv2.missafir.com/assets/flags/english.svg",
        label: "EN",
        link: "https://www.missafir.com/en",
        value: "EN",
      },
      {
        image: "https://www.missafir.com/wp-content/uploads/2023/06/flag-montenegro.svg",
        label: "ME",
        link: "https://www.missafir.com/me",
        value: "ME",
      },
    ];

    for (const {image, label, link, value} of langs) {
      await strapi.entityService.create(entity, {
        data: {
          image,
          label,
          link,
          value,
          publishedAt: new Date()
        }
      })
    }
    console.log("✓ Languages");
  }
}

