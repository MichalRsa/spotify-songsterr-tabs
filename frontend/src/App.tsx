/* eslint-disable no-console */
/* eslint-disable */
import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const redirectAuth = async () => {
      const { data } = await axios.get('/api');
      console.log(data);
      console.log(await axios.get('/api'));
    };
    redirectAuth();
  });
  return (
    <>
      <h1>Hej</h1>
    </>
  );
};

export default App;
