var GraphQLServer = require("graphql-yoga").GraphQLServer;

var typeDefs = `
type Query {
  info: String!
}
`;

var resolvers = {
  Query: {
    info: function info() {
      return "Hello World";
    }
  }
};

var server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(function() {
  return console.log("Server is running on http://localhost:4000");
});
