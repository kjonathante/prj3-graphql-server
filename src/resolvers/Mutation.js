var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var mongojs = require("mongojs");

var utils = require("../utils");
var APP_SECRET = utils.APP_SECRET;
var getUserId = utils.getUserId;

var User = require("../models/User");

async function signup(parent, args, context, info) {
  var password = await bcrypt.hash(args.password, 10);

  var user = await User.create(
    context.db,
    {
      data: { ...args, password: password }
    },
    `{ id }`
  );

  var token = jwt.sign({ userId: user._id }, APP_SECRET);

  return {
    token: token,
    user: user
  };
}

async function login(parent, args, context, info) {
  var user = await User.user(
    context.db,
    { where: { email: args.email } },
    ` { id password } `
  );
  if (!user) {
    throw new Error("No such user found");
  }

  var valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  var token = jwt.sign({ userId: user._id }, APP_SECRET);

  return {
    token: token,
    user: user
  };
}

async function createBook(parent, args, context, info) {
  var userId = getUserId(context);
  try {
    var newBook = { _id: mongojs.ObjectId(), description: args.description };
    await User.createBook(
      context.db,
      {
        query: { _id: mongojs.ObjectId(userId) },
        data: { $push: { books: newBook } }
      },
      info
    );
    context.pubsub.publish("test", { bookAdded: newBook });
    return newBook;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  signup: signup,
  login: login,
  createBook: createBook
};
