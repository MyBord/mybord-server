import youtubeApi from 'youtubeApi/youtubeApi';

export default {
  // ToDo: remove create card
  createCard: async (parent, args, { prisma }, info) => prisma.mutation.createCard(args.data, info),
  createYoutubeCard: async (parent, args, { passport, prisma }, info) => {
    console.log(passport.getUser());
    // is authorized??
    const youtubeVideoData = await youtubeApi.getYoutubeVideoData(args.data.videoId);
    console.log(youtubeVideoData);
    return 'foo bar baz testt eteest';
  },
};
