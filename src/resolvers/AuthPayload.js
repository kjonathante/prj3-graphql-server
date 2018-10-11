var User = require("../models/User");

async function user(root, args, context, info) {
  return await User.user(context.db, { where: { _id: root.user._id } }, info);
}

module.exports = { user: user };
