function create(db, args) {
  return new Promise(function(resolve, reject) {
    db.books.insert(args.data, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

function books(db) {
  return new Promise(function(resolve, reject) {
    db.books.find({}, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}


module.exports = {
  create: create,
  books: books
};
