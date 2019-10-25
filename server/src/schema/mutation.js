const gql = String.raw;

const typeDefs = gql`
  """
  Root mutation, entry point for requests with side-effects
  """
  type Mutation {
    """
    Book launches as trips for currently logged in user
    if false, booking failed
    """
    bookTrips(launchIds: [ID]!): Boolean!

    """
    Cancel launch for currently logged in user
    if success is false, cancellation failed -- check errors
    """
    cancelTrip(launchId: ID!): TripUpdateResponse!

    """
    Login with email, returns the login token that must be set to the
    Authorization header in order for the user to be authenticated
    """
    login(email: String): String
  }

  """
  Mutation response for updating a trip containing success indication and error
  message in the case of failure. launches will contain the Launch's updated
  and can be used for cache updates
  """
  type TripUpdateResponse {
    """
    Whether mutation completed its side-effects
    """
    success: Boolean!
    """
    Launches afffected by the Mutation
    """
    launches: [Launch]
  }
`;

module.exports = typeDefs;
