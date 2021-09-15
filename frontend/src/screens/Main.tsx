/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
// @ts-nocheck
// import {
//   Container,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';
// import setTokenInLocalStorage from '../utils/setLocalStorage';

const Main = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      console.log(tokenFromStorage);
      try {
        const {
          data: { songsData, refresh_token },
        } = await axios.post('api/songs/recent', {
          tokenFromStorage,
        });
        setSongs(songsData);
        setTokenInLocalStorage(refresh_token);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(songs);
  return (
    <>
      <p>Hejka</p>
    </>
  );
};

export default Main;
