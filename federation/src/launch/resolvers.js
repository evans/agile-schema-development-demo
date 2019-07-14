module.exports = {
  Query: {
    launches: async (_, { pageSize = 20, after = 40 }, { dataSources }) => {
      const launches = await dataSources.launchAPI.getAllLaunches({
        limit: pageSize,
        offset: after,
        order: "asc"
      });

      return {
        launches,
        cursor: after + launches.length,
        hasMore: launches.length === pageSize
      };
    },
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id })
  },
  Launch: {
    __resolveReference: ({ id }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
    rocket: launch => ({
      __typeName: "Rocket",
      id: launch.rocket.id
    })
  }
};
