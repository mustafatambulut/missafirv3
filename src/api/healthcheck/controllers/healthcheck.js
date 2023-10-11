'use strict';

/**
 * healthcheck controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::healthcheck.healthcheck', ({strapi}) => ({
    comments: async (ctx) => {
        return "Hello"
    }
}));
