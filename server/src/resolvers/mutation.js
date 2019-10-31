module.exports.Mutation = {
  bookTrips: async (_, { launchIds }, { dataSources }) => {
    const results = await dataSources.userAPI.bookTrips({ launchIds });

    return {
      success: Boolean(results) && results.length === launchIds.length,
      launchIds
    };
  },
  cancelTrip: async (_, { launchId }, { dataSources }) => {
    const result = dataSources.userAPI.cancelTrip({ launchId });

    if (!result)
      return {
        success: false
      };

    return {
      success: true,
      launchIds: [launchId]
    };
  },
  login: async (_, { email }, { dataSources }) => {
    const user = await dataSources.userAPI.findOrCreateUser({ email });
    if (user) return new Buffer(email).toString("base64");
  }
};

module.exports.TripUpdateResponse = {
  launches: ({ launchIds }) => launchIds.map(launchId => ({ id: launchId }))
};
