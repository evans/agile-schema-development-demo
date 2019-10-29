const { RESTDataSource } = require("apollo-datasource-rest");
const fs = require("fs").promises;
const existsSync = require("fs").existsSync;

class RocketAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v3/";
  }

  rocketReducer(rocket) {
    return {
      id: rocket.rocket_id,
      name: rocket.rocket_name,
      type: rocket.rocket_type
    };
  }

  async getRocketById({ rocketId }) {
    try {
      const res = await this.get(`rockets/${rocketId}`);
      if (!existsSync(`./data/rockets/${rocketId}`)) {
        fs.mkdir(`./data/rockets/`, { recursive: true });
        fs.writeFile(`./data/rockets/${rocketId}`, JSON.stringify(res));
      }

      return this.rocketReducer(res);
    } catch (error) {
      if (existsSync(`./data/rockets/${rocketId}`)) {
        const resultFromCache = await fs.readFile(`./data/rockets/${rocketId}`);
        return this.rocketReducer(JSON.parse(resultFromCache));
      } else {
        throw error;
      }
    }
  }
}

module.exports = RocketAPI;
