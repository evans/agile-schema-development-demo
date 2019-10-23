module.exports.Mission = {
  // make sure the default size is 'large' in case user doesn't specify
  missionPatch: (mission, { size } = { size: "LARGE" }) => {
    return size === "SMALL"
      ? mission.missionPatchSmall
      : mission.missionPatchLarge;
  }
};
