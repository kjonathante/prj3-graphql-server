var GraphQLServer = require("graphql-yoga").GraphQLServer;

var books = [
  {
    id: "adsfewrz",
    description: "This is book1"
  },
  {
    id: "aasdewrr",
    description: "This is book2"
  },
  {
    id: "arteywwr",
    description: "This is book3"
  }
];

var typeDefs = `
type Query {
  info: String!
  books: [Book]!
}

type Book {
  id: ID!
  description: String!
}
`;

var resolvers = {
  Query: {
    info: function() {
      return "Hello World";
    },
    books: function() {
      return books;
    }
  },

  // Can be omitted
  // Book: {
  //   id: function(root) {
  //     return root.id;
  //   },
  //   description: function(root) {
  //     return root.description;
  //   },
  // }
};

var server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(function() {
  return console.log("Server is running on http://localhost:4000");
});
