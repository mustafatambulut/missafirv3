'use strict';

/**
 * healthcheck router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::healthcheck.healthcheck', ({strapi}) => ({
    comments: async (ctx) => {
        return "Hello"
    }
}));
