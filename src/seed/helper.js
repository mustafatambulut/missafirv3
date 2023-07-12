module.exports = {
  async destroyAll(entity) {
    await strapi.query(entity).deleteMany({});
  }
}
