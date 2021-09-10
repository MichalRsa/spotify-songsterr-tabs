/* eslint-disable no-console */
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import useQuery from '../hooks/useQuery';

const Redirect = () => {
  const query = useQuery();
  const code = query.get('code');

  const body = {
    code,
  };

  useEffect(() => {
    console.log('useEffect running');
    const fetch = async () => {
      console.log('fetching...');
      try {
        const { data } = await axios.post(`api/auth`, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [code]);
  return <p>Authorizing your Accout ...</p>;
};

export default Redirect;
