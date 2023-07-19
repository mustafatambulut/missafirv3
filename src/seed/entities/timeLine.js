const {destroyAll} = require("../helper");

module.exports = {
  async timeLine(strapi) {
    const entity = "api::timeline-step.timeline-step";
    await destroyAll(entity);

    const mockData = [
      {
        title: "Share your rental property details with us",
        description: "We will investigate the suitability of your property for short-term rentals.",
        buttonLabel: "I want to rent out my home",
        buttonLink: "https://www.missafir.com",
      },
      {
        title: "We evaluate your home and reach out to you",
        description: "Our property managers contact you and initiate the contract process with the agreement of both parties.",
        buttonLabel: "",
        buttonLink: "",
      },
      {
        title: "Let’s take professional photography!",
        description: "Next, our professional photographers and interior designers take the stage. They'll enhance the appeal of your home!",
        buttonLabel: "",
        buttonLink: "",
      },
      {
        title: "Feature your home on short-term rental sites!",
        description: "The final step is digital marketing! We publish your property on our website and the most popular short-term rental sites.",
        buttonLabel: "",
        buttonLink: "",
      }
    ];

    for (const {title, description, buttonLabel, buttonLink} of mockData) {
      await strapi.entityService.create(entity, {
        data: {
          title,
          description,
          buttonLabel,
          buttonLink,
          publishedAt: new Date()
        }
      })
    }
    console.log("✓ TimeLine")
  }
}

