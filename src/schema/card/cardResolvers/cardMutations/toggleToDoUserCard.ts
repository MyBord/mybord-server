import ServerError from 'server/serverError';
import cardInfo from '../../cardUtils/cardInfo';

export default async (parent, args, { passport, prisma }) => {
  const userId = passport.getUserId();
  const { cardId } = args.data;

  const queryArgs = {
    where: {
      id: cardId,
      user: {
        id: userId,
      },
    },
  };

  // Make sure that the card that is trying to be deleted belongs to the user
  const userCard = await prisma.query.cards(queryArgs, '{ id isToDo }');

  if (userCard.length > 0) {
    const updateArgs = {
      data: {
        isToDo: !userCard[0].isToDo,
      },
      where: {
        id: cardId,
      },
    };

    const updatedCard = await prisma.mutation.updateCard(updateArgs, cardInfo);
    return updatedCard;
  }

  throw new ServerError({
    message: 'The user does not have access to delete this card',
    status: 403,
  });
};
