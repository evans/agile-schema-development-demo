const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String): String # login token
  }

  type User {
    id: ID!
    email: String!
  }
`;

module.exports = {
  typeDefs,
  gitContext: {
    remoteUrl: "git@github.com:apollographql/space-explorer.git",
    commit: "03339f83e5afec8981386fd9aab50c2f5f2a84a4",
    committer: "Peggy Rayzis <peggyrayzis@gmail.com>",
    branch: "master"
  }
};
