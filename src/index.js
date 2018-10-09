var uuid = require("uuid/v4");
var GraphQLServer = require("graphql-yoga").GraphQLServer;

var books = [
  {
    id: "adsfewrz",
    description: "This is book1"
  }
];

var resolvers = {
  Query: {
    info: function() {
      return "Hello World";
    },
    books: function() {
      return books;
    }
  },

  Mutation: {
    add: function(root, args) {
      var book = {
        id: uuid(),
        description: args.description
      };
      books.push(book);
      return book;
    }
  }
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
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers
});

server.start(function() {
  return console.log("Server is running on http://localhost:4000");
});
