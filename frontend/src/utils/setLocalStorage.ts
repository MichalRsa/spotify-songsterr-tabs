const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem('refresh_token', token);
};

export default setTokenInLocalStorage;
