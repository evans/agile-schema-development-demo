const { gql } = require("apollo-server");

const typeDefs = gql`
  type Rocket @key(fields: "id") {
    id: ID!
    name: String
    type: String
  }
`;

module.exports = typeDefs;
