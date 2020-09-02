import { CardQueryArgs, Filters } from '../../cardUtils/cardTypes';

export default async (parent, args, { passport, prisma, pubsub }, info) => {
  const userId = passport.getUserId();

  const finalArgs: CardQueryArgs = {
    where: {
      user: {
        id: userId,
      },
    },
  };

  const { isFavorite, isToDo } = args.data;

  const filters: Filters = {};
  if (isFavorite) {
    finalArgs.where.isFavorite = isFavorite;
    filters.isFavorite = isFavorite;
  }

  if (isToDo) {
    finalArgs.where.isToDo = isToDo;
    filters.isToDo = isToDo;
  }

  const userCards = prisma.query.cards(finalArgs, info);
  pubsub.publish('filteredUserCards', { filteredUserCards: { filters, userCards } });
  return userCards;
};
