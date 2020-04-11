// restricts the user data that is returned

export default (user) => ({
  ...user,
  email: 'null',
  password: 'null',
});
