export default (password): void => {
  const passwordArray = password.split('');

  const specialCharacters = ['!', '@', '#', '$', '&', '*', '-'];
  const isUpperCase = (string): boolean => /^[A-Z]*$/.test(string);

  const hasNumber = /\d/.test(password);
  const hasSpecialCharacters = passwordArray.some((i) => specialCharacters.includes(i));
  const hasUpperCase = passwordArray.some((i) => isUpperCase(i));
  const isLongEnough = password.length > 7;

  const isPasswordStrong = hasNumber && hasSpecialCharacters && hasUpperCase && isLongEnough;

  if (!isPasswordStrong) {
    throw new Error('password is weak');
  }
};
