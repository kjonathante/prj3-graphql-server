var jwt = require("jsonwebtoken");
var APP_SECRET = "GraphQL-is-awesome";

function getUserId(context) {
  var Authorization = context.request.get("Authorization");
  if (Authorization) {
    var token = Authorization.replace("Bearer ", "");
    var user = jwt.verify(token, APP_SECRET);
    return user.userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET: APP_SECRET,
  getUserId: getUserId
};
