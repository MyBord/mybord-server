import ServerError from 'server/serverError';
import cardInfo from '../../cardUtils/cardInfo';

export default async (parent, args, { passport, prisma, pubsub }) => {
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

  const deleteArgs = {
    where: {
      id: cardId,
    },
  };

  // Make sure that the card that is trying to be deleted belongs to the user
  const userCard = await prisma.query.cards(queryArgs, '{ id }');

  if (userCard.length > 0) {
    const deletedCard = await prisma.mutation.deleteCard(deleteArgs, cardInfo);
    pubsub.publish('deletedUserCard', { deletedUserCard: deletedCard });
    return deletedCard;
  }

  throw new ServerError({
    message: 'The user does not have access to delete this card',
    status: 403,
  });
};
