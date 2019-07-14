require("dotenv").config();

let apiKey = process.env.ENGINE_API_KEY;
let service = "";
if (apiKey) {
  const split = apiKey.split(":");
  if (split.length >= 2) service = split[1];
}

module.exports = {
  client: {
    name: "Space Explorer [web]",
    service
  }
};
