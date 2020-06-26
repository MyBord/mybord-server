export default {
  deletedUserCard: {
    subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('deletedUserCard'),
  },
  userCard: {
    subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('userCard'),
  },
  userCards: {
    subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('userCards'),
  },
};
