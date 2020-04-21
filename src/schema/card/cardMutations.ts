import youtubeApi from 'youtubeApi/youtubeApi';

export default {
  createYoutubeCard: async (parent, args, { passport, prisma }, info) => {
    const userId = passport.getUserId();

    const youtubeVideoData = await youtubeApi.getYoutubeVideoData(args.data.videoId);

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
            ...youtubeVideoData,
          },
        },
      },
    };

    return prisma.mutation.createCard(finalArgs, info);
  },
};
