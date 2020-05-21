export default {
  count: {
    subscribe: (parent, args, { pubsub }, info) => {
      setInterval(() => {
        pubsub.publish('count', { count: 1 });
      }, 1000);

      return pubsub.asyncIterator('count');
    },
  },
};
