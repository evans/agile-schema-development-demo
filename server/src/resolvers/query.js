module.exports.Query = {
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
    dataSources.launchAPI.getLaunchById({ launchId: id }),
  me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
};
