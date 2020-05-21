export default {
  count: {
    subscribe: (parent, args, { pubsub }, info) => {
      // let count = 0;
      //
      // setInterval(() => {
      //   // eslint-disable-next-line no-plusplus
      //   count++;
      //   pubsub.publish('count', {
      //     count,
      //   });
      // }, 1000);

      return pubsub.asyncIterator('count');
    },
  },
  userCards: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator('userCards');
    },
  },
};
