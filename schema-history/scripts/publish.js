require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
  introspectionFromSchema,
  buildASTSchema,
  printSchema,
  buildClientSchema
} = require("graphql");
const {
  ApolloEngineClient,
  DefaultEngineConfig
} = require("apollo-language-server");

const schemaFiles = [
  "01-schema-peggy",
  "02-schema-hugh",
  "03-schema-justin",
  "04-schema-james",
  "05-schema-jake"
];

const typeDefsAndContext = schemaFiles.map(file => require(`../src/${file}`));

let apiKey = process.env.ENGINE_API_KEY;
let service = "";
if (apiKey) {
  const split = apiKey.split(":");
  if (split.length >= 2) service = split[1];
}

const engine = new ApolloEngineClient(apiKey, DefaultEngineConfig.endpoint, {
  name: "evans-demo",
  version: "",
  referenceId: ""
});

const main = async () => {
  for (const { typeDefs, gitContext } of typeDefsAndContext) {
    console.log("publishing for ", gitContext.committer);
    const schema = buildASTSchema(typeDefs);

    const introspection = introspectionFromSchema(schema);

    // fs.writeFileSync(
    //   path.join(__dirname, "..", "schema.json"),
    //   JSON.stringify(introspection, null, 2)
    // );

    const variables = {
      id: service,
      schema: introspection.__schema,
      tag: "current",
      gitContext
    };

    try {
      await engine.uploadSchema(variables);
    } catch (error) {
      console.log(engine);
      console.log({ ...variables, schema: undefined });
    }
  }
};

main();
