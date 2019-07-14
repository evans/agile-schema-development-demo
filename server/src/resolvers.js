const { paginateResults } = require("./utils");

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
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  },
  Mutation: {
    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const results = await dataSources.userAPI.bookTrips({ launchIds });

      return results.length;
    },
    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = dataSources.userAPI.cancelTrip({ launchId });

      if (!result)
        return {
          success: false,
          message: "failed to cancel trip"
        };

      return {
        success: true,
        message: "trip cancelled",
        launchIds: [launchId]
      };
    },
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return new Buffer(email).toString("base64");
    }
  },
  TripUpdateResponse: {
    launches: ({ launchIds }) => launchIds.map(launchId => ({ id: launchId }))
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
    rocket: (launch, _, { dataSources }) =>
      dataSources.rocketAPI.getRocketById({
        rocketId: launch.rocket.id
      })
  },
  Mission: {
    // make sure the default size is 'large' in case user doesn't specify
    missionPatch: (mission, { size } = { size: "LARGE" }) => {
      return size === "SMALL"
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    }
  },
  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds
        }) || []
      );
    }
  }
};