import ServerError from 'server/serverError';
import getYoutubeVideoId from 'utils/getYoutubeVideoId';
import youtube from 'youtube/youtube';

export default {
  createYoutubeCard: async (parent, args, { passport, prisma, pubsub }, info) => {
    try {
      const userId = passport.getUserId();
      const videoId = getYoutubeVideoId(args.data.videoUrl);
      const youtubeVideoData = await youtube.getYoutubeVideoData(videoId);

      const finalArgs = {
        ...args,
        data: {
          cardData: {
            create: {
              youtubeCardData: {
                create: {
                  ...youtubeVideoData,
                },
              },
            },
          },
          isFavorite: false,
          isToDo: false,
          type: 'Youtube',
          user: {
            connect: {
              id: userId,
            },
          },
        },
      };

      const card = await prisma.mutation.createCard(finalArgs, info);
      pubsub.publish('userCard', { userCard: card });
      return card;
    } catch (error) {
      throw new ServerError({ message: error.message, status: 400 });
    }
  },
  deleteUserCard: async (parent, args, { passport, prisma, pubsub }, info) => {
    const userId = passport.getUserId();
    const { cardId } = args.data;

    const queryArgs = {
      where: {
        user: {
          id: userId,
        },
      },
    };
    const userCards = await prisma.query.cards(queryArgs, info);
    const userCardsIds = userCards.map((userCard) => userCard.id);

    if (userCardsIds.includes(cardId)) {
      const finalArgs = {
        where: {
          id: cardId,
        },
      };

      const card = await prisma.mutation.deleteCard(finalArgs, info);
      pubsub.publish('deletedUserCard', { deletedUserCard: card });
      return card;
    }

    throw new ServerError({
      message: 'The user does not have access to delete this card',
      status: 403,
    });
  },
  toggleFavoriteUserCard: async (parent, args, { passport, prisma }) => {
    const userId = passport.getUserId();
    const { cardId } = args.data;

    const queryArgs = {
      where: {
        user: {
          id: userId,
        },
      },
    };
    const userCards = await prisma.query.cards(queryArgs, '{ id isFavorite }');
    const userCardsIds = userCards.map((userCard) => userCard.id);
    console.log(userCards);

    // if (userCardsIds.includes(cardId)) {
    //   const finalArgs = {
    //     data: {},
    //     where: {
    //       id: cardId,
    //     },
    //   };
    //
    //   const card = await prisma.mutation.updateCard(finalArgs, info);
    //   return card;
    // }
    //
    // throw new ServerError({
    //   message: 'The user does not have access to delete this card',
    //   status: 403,
    // });
  },
};
