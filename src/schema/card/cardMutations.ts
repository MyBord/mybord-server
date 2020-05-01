import getYoutubeVideoId from 'utils/getYoutubeVideoId';
import youtube from 'youtube/youtube';

export default {
  createYoutubeCard: async (parent, args, { passport, prisma }, info) => {
    try {
      const userId = passport.getUserId();

      const videoId = getYoutubeVideoId(args.data.videoId);

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
      return prisma.mutation.createCard(finalArgs, info);
    } catch (error) {
      throw Error(error);
    }
  },
};
