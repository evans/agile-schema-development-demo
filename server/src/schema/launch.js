const gql = String.raw;

const typeDefs = gql`
  """
  launch from spaceX api
  """
  type Launch {
    """
    unique identifier for the launch
    """
    id: ID!
    """
    launch site
    """
    site: String
    """
    Mission associated with the launch
    """
    mission: Mission
    """
    Rocket used on the launch
    """
    rocket: Rocket
    """
    Whether the current user has booked this launch
    """
    isBooked: Boolean!
  }
`;

module.exports = typeDefs;
