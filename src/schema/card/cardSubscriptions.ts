export default {
  deletedUserCard: {
    subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('deletedUserCard'),
  },
  userCard: {
    subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('userCard'),
  },
  filteredUserCards: {
    subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('filteredUserCards'),
  },
};
