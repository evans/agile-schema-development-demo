const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    launches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    # if false, signup failed
    bookTrips(launchIds: [ID]!): Boolean!

    login(email: String): String # login token
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = {
  typeDefs,
  gitContext: {
    remoteUrl: "git@github.com:apollographql/space-explorer.git",
    commit: "d1ecdf449f96b2d937671d6a41f3fced6d10c935",
    committer: "James Baxley <james@apollographql.com>",
    branch: "master"
  }
};
