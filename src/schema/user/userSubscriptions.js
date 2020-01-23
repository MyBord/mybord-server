export default {
  isUserAuthenticated: {
    subscribe(parent, args, { passport }, info) {
      console.log('*********');
      console.log(passport);
      console.log('------------');
      console.log(passport.isAuthenticated());
      console.log(passport.isUnauthenticated());
      return passport.isAuthenticated();
    },
  },
};
