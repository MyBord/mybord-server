export default (password): void => {
  const passwordArray = password.split('');

  const specialCharacters = ['!', '@', '#', '$', '&', '*', '-'];
  const isUpperCase = (string) => /^[A-Z]*$/.test(string);

  const hasNumber = /\d/.test(password);
  const hasSpecialCharacters = passwordArray.some((i) => specialCharacters.includes(i));
  const hasUpperCase = passwordArray.some(i => isUpperCase(i));
  const isLongEnough = password.length > 7;

  const isPasswordStrong = hasNumber && hasSpecialCharacters && hasUpperCase && isLongEnough;

  const errorMessage = 'A password must be at least 8 characters long, have at least one upper'
    + ' case letter, have at least one number,'
    + ` and contain at least one special character (${specialCharacters.join('')}).`;

  if (!isPasswordStrong) {
    throw new Error(errorMessage);
  }
};
