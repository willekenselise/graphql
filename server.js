let { graphqlHTTP } = require("express-graphql");
let express = require("express");
const { schema, resolvers } = require("./graphql/index.js");

let app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(3000);
