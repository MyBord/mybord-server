import { CardQueryArgs } from 'types/argTypes';

export default {
  userCards: async (parent, args, { passport, prisma }, info) => {
    const userId = passport.getUserId();

    const finalArgs = {
      ...args,
      where: {
        user: {
          id: userId,
        },
      },
    };
    return prisma.query.cards(finalArgs, info);
  },
  userCardsWithFilters: async (parent, args, { passport, prisma, pubsub }, info) => {
    const userId = passport.getUserId();

    const finalArgs: CardQueryArgs = {
      where: {
        user: {
          id: userId,
        },
      },
    };

    const { isFavorite, isToDo } = args.data;

    if (isFavorite) {
      finalArgs.where.isFavorite = isFavorite;
    }

    if (isToDo) {
      finalArgs.where.isToDo = isToDo;
    }

    const userCards = prisma.query.cards(finalArgs, info);
    // pubsub.publish('filteredUserCards', { filteredUserCards: userCards });
    pubsub.publish('filteredUserCards', { filteredUserCards: { userCards } });
    return userCards;
  },
};
