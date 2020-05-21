export default {
  userCard: {
    subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('userCard'),
  },
};
