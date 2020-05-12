import ServerError from 'serverError/serverError';
import getYoutubeVideoId from 'utils/getYoutubeVideoId';
import youtube from 'youtube/youtube';

export default {
  createYoutubeCard: async (parent, args, { passport, prisma }, info) => {
    try {
      const userId = passport.getUserId();

      const videoId = getYoutubeVideoId(args.data.videoUrl);

      const youtubeVideoData = await youtube.getYoutubeVideoData(videoId);

      console.log(youtubeVideoData);

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
      throw new ServerError({ message: error.message, status: 400 });
    }
  },
};
