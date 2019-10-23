const { Query } = require("./resolvers/query");
const { Mutation, TripUpdateResponse } = require("./resolvers/mutation");
const { Launch } = require("./resolvers/launch");
const { Mission } = require("./resolvers/mission");
const { User } = require("./resolvers/user");

module.exports = {
  Query,
  Mutation,
  TripUpdateResponse,
  Launch,
  Mission,
  User
};
