function create(db, args) {
  return new Promise(function(resolve, reject) {
    db.users.insert(args.data, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

function createBook(db, args) {
  return new Promise(function(resolve, reject) {
    console.log(args.query);
    console.log(args.data);
    db.users.update(args.query, args.data, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

function user(db, args) {
  return new Promise(function(resolve, reject) {
    db.users.findOne(args.where, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

module.exports = {
  create: create,
  createBook: createBook,
  user: user
};
