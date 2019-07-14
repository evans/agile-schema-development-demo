const fs = require('fs');
const path = require('path');
const { mergeSchemas, makeExecutableSchema } = require('graphql-tools');

const { getIntrospectionQuery, execute, parse } = require('graphql');

const typeDefs = require('../src/schema')

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: { requireResolversForResolveType: false },
});


const introspection = execute(schema, parse(getIntrospectionQuery()));

fs.writeFileSync(
  path.join(__dirname, '..', 'schema.json'),
  JSON.stringify(introspection, null, 2),
);
