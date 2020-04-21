import youtubeApi from 'youtubeApi/youtubeApi';

export default {
  createYoutubeCard: async (parent, args, { passport, prisma }, info) => {
    const userId = passport.getUserId();

    const finalArgs = {
      ...args,
      data: {
        type: 'Youtube',
        description: 'this is testing the api',
        user: {
          connect: {
            id: userId,
          },
        },
        cardData: {
          create: {
            description: 'another root test',
          },
        },
      },
    };

    const youtubeVideoData = await youtubeApi.getYoutubeVideoData(args.data.videoId);
    // console.log(youtubeVideoData);
    console.log('creating card in prisma');
    return prisma.mutation.createCard(finalArgs, info);
  },
};
