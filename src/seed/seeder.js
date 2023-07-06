'use strict';
const {home} = require("./entities/home");
const {cities} = require("./entities/cities");
const {menuLinks} = require("./entities/menuLinks");
const {userLinks} = require("./entities/userLinks");
const {languages} = require("./entities/languages");
const {brandLinks} = require("./entities/brandLinks");
const {footerLinks} = require("./entities/footerLinks");

module.exports = {
  async seeder(strapi) {
    console.log("--------------------------------------------------------")
    console.log("Seeder started...\n")

    await Promise.all([
      home(strapi),
      cities(strapi),
      userLinks(strapi),
      menuLinks(strapi),
      languages(strapi),
      brandLinks(strapi),
      footerLinks(strapi),
    ]);

    console.log("--------------------------------------------------------")
  }
}


