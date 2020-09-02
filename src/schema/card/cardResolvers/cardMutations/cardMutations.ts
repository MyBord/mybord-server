import ServerError from 'server/serverError';
import youtube from 'youtube/youtube';
import cardEnums from '../../cardUtils/cardEnums';
import cardInfo from '../../cardUtils/cardInfo';
import { getCardType, getYoutubeVideoId } from '../../cardUtils/cardUtils';
import createUserCard from './createUserCard';

export default {
  createUserCard,
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
  initiateUserCard: async (parent, args) => {
    try {
      const videoId = getYoutubeVideoId(args.data.url);
      const youtubeVideoData = await youtube.getYoutubeVideoData(videoId);

      return {
        category: cardEnums.video,
        title: youtubeVideoData.videoTitle,
        url: args.data.url,
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
