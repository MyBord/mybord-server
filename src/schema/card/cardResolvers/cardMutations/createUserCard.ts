import ServerError from 'server/serverError';
import cardInfo from '../../cardUtils/cardInfo';
import { getCardType, getUserCardCreateArgs } from '../../cardUtils/cardUtils';

export default async (parent, args, { passport, prisma, pubsub }) => {
  try {
    const {
      category,
      isFavorite,
      isToDo,
      title,
      url,
    } = args.data;

    const type = await getCardType(url);

    const userId = passport.getUserId();

    const createArgs = await getUserCardCreateArgs(url);

    const finalArgs = {
      ...args,
      data: {
        cardData: {
          create: { ...createArgs },
        },
        category,
        isFavorite,
        isToDo,
        title,
        type,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    };

    const card = await prisma.mutation.createCard(finalArgs, cardInfo);
    pubsub.publish('userCard', { userCard: card });
    return card;
  } catch (error) {
    throw new ServerError({ message: error.message, status: 400 });
  }
};
