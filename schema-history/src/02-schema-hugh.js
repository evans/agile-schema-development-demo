const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    login(email: String): String # login token
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
    commit: "5e64f7efda216c53784fb33fea4a6bfb4954610f",
    committer: "Hugh Willson <hugh@octonary.com>",
    message:
      "Make sure the GetMyTrips query has a result before accessing fields",
    branch: "master"
  }
};
