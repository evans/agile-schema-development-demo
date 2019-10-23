const { gql } = require("apollo-server");

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

  type Mission {
    """
    user-facing name of mission
    """
    name: String
    """
    url for image of mission patch
    """
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
