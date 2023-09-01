'use strict';

/**
 * life-at service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::life-at.life-at');
