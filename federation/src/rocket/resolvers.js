module.exports = {
  Rocket: {
    __resolveReference: ({ id }, { dataSources }) =>
      dataSources.rocketAPI.getRocketById({
        rocketId: id
      })
  }
};
