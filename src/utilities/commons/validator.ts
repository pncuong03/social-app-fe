// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const isValidPassword = (password: string) => {
  return passwordRegex.test(password);
};

export const isValidUsername = (username: string) => {
  return username.length > 6 && username.length < 50;
};
