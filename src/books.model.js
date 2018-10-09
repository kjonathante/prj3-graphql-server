function create(db, book) {
  return new Promise(function(resolve, reject) {
    db.books.insert(book, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

function users(db) {
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
  users: users,
};
