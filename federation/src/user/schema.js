const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    me: User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrips(launchIds: [ID]!): Boolean!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String # login token
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  extend type Launch @key(fields: "id") {
    id: ID! @external
    isBooked: Boolean!
  }
`;

module.exports = typeDefs;
