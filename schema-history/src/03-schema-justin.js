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
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }
`;

module.exports = {
  typeDefs,
  gitContext: {
    remoteUrl: "git@github.com:apollographql/space-explorer.git",
    commit: "2a309e7a04e8e33a0df238037ef1c3c9a8ac73e7",
    committer: "Justin Anastos <justin.anastos@gmail.com>",
    branch: "master"
  }
};
