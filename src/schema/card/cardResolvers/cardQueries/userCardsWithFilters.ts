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

  const { categories, isFavorite, isToDo } = args.data;

  const filters: Filters = {};

  if (categories && categories.length > 0) {
    finalArgs.where.category_in = categories;
    filters.categories = categories;
  } else {
    filters.categories = [];
  }

  if (isFavorite) {
    finalArgs.where.isFavorite = isFavorite;
    filters.isFavorite = isFavorite;
  } else {
    filters.isFavorite = false;
  }

  if (isToDo) {
    finalArgs.where.isToDo = isToDo;
    filters.isToDo = isToDo;
  } else {
    filters.isToDo = false;
  }

  const userCards = prisma.query.cards(finalArgs, info);
  pubsub.publish('filteredUserCards', { filteredUserCards: { filters, userCards } });
  return userCards;
};
