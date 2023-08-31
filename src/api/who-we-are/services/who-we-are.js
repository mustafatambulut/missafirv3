'use strict';

/**
 * who-we-are service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::who-we-are.who-we-are');
