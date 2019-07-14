module.exports = {
  Rocket: {
    __resolveReference: ({ id }, _, { dataSources }) =>
      dataSources.rocketAPI.getRocketById({
        rocketId: id
      })
  }
};
