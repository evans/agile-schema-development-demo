const { RESTDataSource } = require("apollo-datasource-rest");

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
    const res = await this.get(`rockets/${rocketId}`);
    return this.rocketReducer(res);
  }
}

module.exports = RocketAPI;
