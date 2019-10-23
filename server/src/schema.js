const { gql } = require("apollo-server");
const query = require("./schema/query");
const mutation = require("./schema/mutation");
const launch = require("./schema/launch");
const rocket = require("./schema/rocket");
const mission = require("./schema/mission");
const user = require("./schema/user");

const typeDefs = gql(query + mutation + launch + rocket + mission + user);

module.exports = typeDefs;
