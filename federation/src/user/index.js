require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const isEmail = require("isemail");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("../utils");

const UserAPI = require("../datasources/user");

const internalEngineDemo = require("../engine-demo");

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  userAPI: new UserAPI({ store })
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || "";
  const email = new Buffer(auth, "base64").toString("ascii");

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user: { ...user.dataValues } };
};

// Set up Apollo Server
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources,
  context,
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
    .listen({ port: process.env.PORT || 5003 })
    .then(({ url }) => console.log(`🚀 users service running at ${url}`));
