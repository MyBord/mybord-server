export default async (parent, args, { passport, prisma }) => {
  console.log('*********************');
  console.log('*********************');
  console.log('get current user');
  const isAuthenticated = passport.isAuthenticated();

  console.log(isAuthenticated);
  if (isAuthenticated) {
    const currentUserId = passport.getUserId();
    console.log(currentUserId);

    const queryArgs = {
      where: {
        id: currentUserId,
      },
    };

    const currentUser = await prisma.query.user(queryArgs, '{ email, username }');

    const { email, username } = currentUser;
    console.log(currentUser);

    return {
      email,
      isAuthenticated,
      username,
    };
  }

  return {
    email: undefined,
    isAuthenticated,
    username: undefined,
  };
};
