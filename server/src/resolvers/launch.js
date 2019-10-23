module.exports.Launch = {
  isBooked: async (launch, _, { dataSources }) =>
    dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  rocket: async (launch, _, { dataSources }) => {
    const { rocket } = await dataSources.launchAPI.getLaunchById({
      launchId: launch.id
    });
    return dataSources.rocketAPI.getRocketById({
      rocketId: rocket.id
    });
  },
  mission: async (launch, _, { dataSources }) => {
    const { mission } = await dataSources.launchAPI.getLaunchById({
      launchId: launch.id
    });
    return mission;
  }
};
