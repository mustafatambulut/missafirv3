'use strict';

/**
 * healthcheck service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::healthcheck.healthcheck', ({strapi}) => ({
    comments: async (ctx) => {
        return "Hello"
    }
}));
