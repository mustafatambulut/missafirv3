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
    console.log("--------------------------------------------------------");
    console.log("Seeder started...\n");

    const promises = [
      new Promise((resolve) => resolve(cities(strapi))),
      new Promise((resolve) => resolve(userLinks(strapi))),
      new Promise((resolve) => resolve(menuLinks(strapi))),
      new Promise((resolve) => resolve(languages(strapi))),
      new Promise((resolve) => resolve(brandLinks(strapi))),
      new Promise((resolve) => resolve(footerLinks(strapi))),
      new Promise((resolve) => resolve(home(strapi)))
    ];

    await Promise.all(promises).then(() => console.log("Seeder finished...\n"));

    console.log("--------------------------------------------------------")
  }
}


