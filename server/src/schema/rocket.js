const gql = String.raw;

const typeDefs = gql`
  """
  Rocket from spaceX api
  """
  type Rocket {
    """
    unique identifier for the rocket
    """
    id: ID!
    """
    full name of rocket
    """
    name: String
    """
    model of rocket designated by Space X
    """
    type: String
  }
`;

module.exports = typeDefs;
