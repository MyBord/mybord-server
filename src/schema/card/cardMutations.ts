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
          type: 'Youtube',
          user: {
            connect: {
              id: userId,
            },
          },
          cardData: {
            create: {
              youtubeCardData: {
                create: {
                  ...youtubeVideoData,
                },
              },
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
};
