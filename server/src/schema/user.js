const gql = String.raw;

const typeDefs = gql`
  """
  User information
  """
  type User {
    """
    unique identifier for the user
    """
    id: ID!
    """
    email used to log in
    """
    email: String!
    """
    Booked trips
    """
    trips: [Launch]!
  }
`;

module.exports = typeDefs;
