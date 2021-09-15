/* eslint-disable @typescript-eslint/naming-convention */
export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem('refresh_token', token);
};

export const getTokenFromLocalStorage = () => {
  const refresh_token = localStorage.getItem('refresh_token');
  return refresh_token;
};
