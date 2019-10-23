const gql = String.raw;

const typeDefs = gql`
  """
  mission from spaceX api
  """
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
