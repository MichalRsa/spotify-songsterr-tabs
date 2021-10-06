const params = {
  client_id: '378f1ce509b643ae809011e62f85b8d9',
  response_type: 'code',
  redirect_uri:
    process.env.NODE_ENV === 'production'
      ? 'https://fast-ridge-27303.herokuapp.com/redirect'
      : 'http://localhost:8080/redirect',
  state: '34fFs29kd09',
  scope:
    'user-read-recently-played user-top-read user-library-read playlist-read-private',
} as const;

export default params;
