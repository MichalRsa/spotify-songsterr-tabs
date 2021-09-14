/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
// import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import fetchToken from '../actions/spotifyAuthActions';
import useQuery from '../hooks/useQuery';
import { RootState } from '../store';
// import setTokenInLocalStorage from '../utils/setLocalStorage';

const Redirect = () => {
  // const [user, setUser] = useState('');
  const user = useSelector((state: RootState) => state.spotifyAuth);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const code = query.get('code');

  const body = {
    code,
  };

  useEffect(() => {
    dispatch(fetchToken(user, body));
    // const fetchToken = async () => {
    //   if (!user)
    //     try {
    //       const { data } = await axios.post(`api/auth`, body, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
    //       setUser(data.userData);
    //       setTokenInLocalStorage(data.refresh_token);
    //       console.log(data.userData, data.songsData);
    //     } catch (err) {
    //       console.log(err);
    //     }
    // };
    // fetchToken();
    user && history.push('/main');
  }, [code, user]);
  return <p>Authorizing your Accout ...</p>;
};

export default Redirect;
