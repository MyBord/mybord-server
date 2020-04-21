import youtube from 'youtube/youtube';

export default {
  createYoutubeCard: async (parent, args, { passport, prisma }, info) => {
    const userId = passport.getUserId();

    const youtubeVideoData = await youtube.getYoutubeVideoData(args.data.videoId);

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
  },
};
