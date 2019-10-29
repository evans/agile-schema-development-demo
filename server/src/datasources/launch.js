const { RESTDataSource } = require("apollo-datasource-rest");
const fs = require("fs").promises;
const existsSync = require("fs").existsSync;

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v3/";
  }

  // leaving this inside the class to make the class easier to test
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type
      }
    };
  }

  async getAllLaunches({ offset, limit, order } = {}) {
    try {
      const response = await this.get("launches", { offset, limit, order });
      if (!existsSync(`./data/launch/${offset}-${limit}-${order}`)) {
        fs.mkdir(`./data/launch`, { recursive: true });
        fs.writeFile(
          `./data/launch/${offset}-${limit}-${order}`,
          JSON.stringify(response)
        );
      }

      // transform the raw launches to a more friendly
      return Array.isArray(response)
        ? response.map(launch => {
            return this.launchReducer(launch);
          })
        : [];
    } catch (error) {
      if (existsSync(`./data/launch/${offset}-${limit}-${order}`)) {
        const resultFromCache = JSON.parse(
          await fs.readFile(`./data/launch/${offset}-${limit}-${order}`)
        );
        return Array.isArray(resultFromCache)
          ? resultFromCache.map(launch => {
              return this.launchReducer(launch);
            })
          : [];
      } else {
        throw error;
      }
    }
  }

  async getLaunchById({ launchId }) {
    try {
      const res = await this.get("launches", { flight_number: launchId });

      if (!existsSync(`./data/launch/${launchId}`)) {
        fs.mkdir(`./data/launch`, { recursive: true });
        fs.writeFile(`./data/launch/${launchId}`, JSON.stringify(res));
      }

      return this.launchReducer(res[0]);
    } catch (error) {
      if (existsSync(`./data/launch/${launchId}`)) {
        const resultFromCache = await fs.readFile(`./data/launch/${launchId}`);
        return this.launchReducer(JSON.parse(resultFromCache)[0]);
      } else {
        throw error;
      }
    }
  }

  async getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    );
  }
}

module.exports = LaunchAPI;
