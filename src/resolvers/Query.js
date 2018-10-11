var mongojs = require("mongojs");
var User = require("../models/User");
var utils = require("../utils");
var getUserId = utils.getUserId;

function info(parent, args, context, info) {
  return "Hello World";
}

async function books(parent, args, context, info) {
  var userId = getUserId(context);

  try {
    var user = await User.user(context.db, {
      where: { _id: mongojs.ObjectId(userId) }
    });
    return user.books;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  info: info,
  books: books
};
