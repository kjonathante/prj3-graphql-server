module.exports = {
  bookAdded: {
    subscribe: function(root, args, context) {
      return context.pubsub.asyncIterator("test");
    }
  }
};
