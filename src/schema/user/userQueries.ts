import restrictUserData from 'utils/restrictUserData';

export default {
  currentUser: async (parent, args, { passport }, info) => passport.getUser(),
  foo: () => ({
    name: 'jimmy',
    state: 'nj',
  }),
  isAuthenticated: async (parent, args, { passport }, info) => (
    passport.isAuthenticated()
  ),
  users: async (parent, args, { prisma, request }, info) => {
    const finalArgs = {
      ...args,
      where: {
        ...args.where,
      },
    };
    if (args && args.where && args.where.email) {
      delete finalArgs.where.email;
    }

    const users = await prisma.query.users(finalArgs, info);

    return users.map(async (user) => restrictUserData(user));
  },
  youtubeCard: () => ({
    channelThumbnail: 'https://yt3.ggpht.com/a/AATXAJwdR0jPtm5wtBCIvgIwxnuqj7foX8BKykDoyA=s240-c-k-c0xffffffff-no-rj-mo',
    channelTitle: '12Medbe Network',
    duration: '03:30',
    likes: '8,346',
    publishedAt: '3y ago',
    videoId: 'ctYhIob_5xI',
    videoThumbnail: 'https://i.ytimg.com/vi/ctYhIob_5xI/mqdefault.jpg',
    videoTitle: 'Whose Line: If You Know What I Mean',
    views: '588,960',
  }),
};
