export default (username: string): void => {
  const regex = RegExp(/^[\w\d_.-]+$/g);

  if (!regex.test(username)) {
    throw new Error('invalid username');
  }
};
