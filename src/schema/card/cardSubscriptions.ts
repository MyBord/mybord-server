export default {
  count: { // remove
    subscribe: (parent, args, { pubsub }, info) => {
      setInterval(() => {
        // pubsub.publish('count', { count: 1 });
      }, 1000);

      return pubsub.asyncIterator('count');
    },
  },
  userCard: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator('userCard'); // remove return statement
    },
  },
};
