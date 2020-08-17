import ServerError from 'server/serverError';
import getYoutubeVideoId from 'utils/getYoutubeVideoId';
import youtube from 'youtube/youtube';
import cardEnums from './cardEnums';
import cardInfo from './cardInfo';

export default {
  createYoutubeCard: async (parent, args, { passport, prisma, pubsub }) => {
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
          type: cardEnums.youtube,
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
  },
  deleteUserCard: async (parent, args, { passport, prisma, pubsub }) => {
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
  },
  initiateYoutubeCard: async (parent, args) => {
    try {
      const videoId = getYoutubeVideoId(args.data.videoUrl);
      const youtubeVideoData = await youtube.getYoutubeVideoData(videoId);

      return {
        cardType: cardEnums.youtube,
        title: youtubeVideoData.channelTitle,
        youtubeCardData: youtubeVideoData,
      };
    } catch (error) {
      throw new ServerError({ message: error.message, status: 400 });
    }
  },
  toggleFavoriteUserCard: async (parent, args, { passport, prisma }) => {
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
    const userCard = await prisma.query.cards(queryArgs, '{ id isFavorite }');

    if (userCard.length > 0) {
      const updateArgs = {
        data: {
          isFavorite: !userCard[0].isFavorite,
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
  },
  toggleToDoUserCard: async (parent, args, { passport, prisma }) => {
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
  },
};
