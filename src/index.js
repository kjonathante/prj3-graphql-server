var graphqlyoga = require("graphql-yoga"),
  GraphQLServer = graphqlyoga.GraphQLServer,
  PubSub = graphqlyoga.PubSub;

var Query = require("./resolvers/Query");
var Mutation = require("./resolvers/Mutation");
var AuthPayload = require("./resolvers/AuthPayload");
var Subscription = require("./resolvers/Subscription");

var mongojs = require("mongojs");
var db = mongojs("prj3_db", ["books"]);
db.users.createIndex({ email: 1 }, { unique: true });

// var resolvers = {
//   Query: {
//     info: function() {
//       return "Hello World";
//     },
//     books: async function(root, args, context) {
//       return await booksModel.users(context.db);
//     }
//   },

//   Mutation: {
//     add: async function(root, args, context) {

//       var book = await booksModel.create(context.db, {
//         description: args.description
//       });
//       context.pubsub.publish("test", { bookAdded: book });
//       return book;
//     }
//   },

//   Subscription: {
//     bookAdded: {
//       subscribe: function(root, args, context) {
//         return context.pubsub.asyncIterator("test");
//       }
//     }
//   }
// };

var resolvers = {
  Query: Query,
  Mutation: Mutation,
  AuthPayload: AuthPayload,
  Subscription: Subscription
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
