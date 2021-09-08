/* eslint-disable no-console */
/* eslint-disable */
import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

let config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};
const App = () => {
  const redirectToAuth = () => {
    const redirectAuth = async () => {
      // console.log(await axios.get('http://localhost:3000/api'));
      const { data } = await axios.get('/api');
      console.log(data);
    };
    // redirectAuth();
    window.location.href = '/api';
    console.log('hej');
  };
  const showUserName = async () => {
    // console.log(await axios.get('http://localhost:3000/api'));
    const { data } = await axios.get('/api/username');
    console.log(data);
  };
  return (
    <>
      <h1>Hej</h1>
      <button onClick={() => redirectToAuth()}>Sign in</button>
      <button onClick={() => showUserName()}>Show user name</button>
    </>
  );
};

export default App;
