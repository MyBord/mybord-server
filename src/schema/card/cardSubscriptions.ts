export default {
  userCards: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        // eslint-disable-next-line no-plusplus
        count++;
        pubsub.publish('userCards', {
          userCards: count,
        });
      }, 1000);

      return pubsub.asyncIterator('userCards');
    },
  },
};
