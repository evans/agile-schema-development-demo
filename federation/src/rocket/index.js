require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const RocketAPI = require("../datasources/rocket");

const internalEngineDemo = require("../engine-demo");

// set up any dataSources our resolvers need
const dataSources = () => ({
  rocketAPI: new RocketAPI()
});

// Set up Apollo Server
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources,
  introspection: true,
  debug: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    ...internalEngineDemo
  }
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test")
  server
    .listen({ port: process.env.PORT || 5001 })
    .then(({ url }) => console.log(`🚀 rockets service running at ${url}`));
