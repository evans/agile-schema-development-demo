const gql = String.raw;

const typeDefs = gql`
  """
  Root query, entry point for requests without side-effects
  """
  type Query {
    """
    Get paginated list of launches from spaceX api
    """
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
    """
    Get launch by id from spaceX api
    """
    launch(
      """
      ID of a Launch
      """
      id: ID!
    ): Launch
    """
    Current logged in user
    """
    me: User
  }

  """
  Wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    """
    Cursor that points at the last item in the list
    """
    cursor: String!
    """
    True if there are more elements to fetch
    """
    hasMore: Boolean!
    """
    Launches in the current batch
    """
    launches: [Launch]!
  }
`;

module.exports = typeDefs;
