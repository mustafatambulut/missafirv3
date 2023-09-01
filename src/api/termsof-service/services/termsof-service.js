'use strict';

/**
 * termsof-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::termsof-service.termsof-service');
