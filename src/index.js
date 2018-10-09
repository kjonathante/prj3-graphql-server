var uuid = require("uuid/v4");
var graphqlyoga = require("graphql-yoga"),
  GraphQLServer = graphqlyoga.GraphQLServer,
  PubSub = graphqlyoga.PubSub;
var booksModel = require("./books.model");

var mongojs = require("mongojs");
var db = mongojs("prj3_db", ["books"]);

// var books = [
//   {
//     id: "adsfewrz",
//     description: "This is book1"
//   }
// ];

var resolvers = {
  Query: {
    info: function() {
      return "Hello World";
    },
    books: async function(root, args, context) {
      // return books;
      return await booksModel.users(context.db);
    }
  },

  Mutation: {
    add: async function(root, args, context) {
      // var book = {
      //   id: uuid(),
      //   description: args.description
      // };
      // books.push(book);

      var book = await booksModel.create(context.db, {
        description: args.description
      });
      context.pubsub.publish("test", { bookAdded: book });
      return book;
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: function(root, args, context) {
        return context.pubsub.asyncIterator("test");
      }
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

var pubsub = new PubSub();
var server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers,
  context: function(req) {
    return { ...req, pubsub: pubsub, db: db };
  }
});

server.start(function() {
  return console.log("Server is running on http://localhost:4000");
});
