require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

const internalEngineDemo = require("./engine-demo");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "rocket", url: "http://localhost:5001" },
    { name: "user", url: "http://localhost:5002" },
    { name: "launch", url: "http://localhost:5003" }
  ],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set("authorization", context.userToken);
      }
    });
  }
});

(async () => {
  const { schema, executor } = await gateway.load();

  // Set up Apollo Server
  const server = new ApolloServer({
    schema,
    executor,
    introspection: true,
    debug: true,
    engine: {
      apiKey: process.env.ENGINE_API_KEY,
      ...internalEngineDemo
    },
    context: ({ req }) => {
      return { userToken: req.headers.authorization || "" };
    }
  });

  server
    .listen({ port: process.env.PORT || 5000 })
    .then(({ url }) => console.log(`🚀 federated app running at ${url}`));
})();
