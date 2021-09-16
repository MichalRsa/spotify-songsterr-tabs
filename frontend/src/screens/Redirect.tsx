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

const Redirect = () => {
  // const [user, setUser] = useState('');
  const user = useSelector((state: RootState) => state.spotifyAuth?.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const code = query.get('code');

  const body = {
    code,
  };

  useEffect(() => {
    dispatch(fetchToken(user, body));
    user && history.push('/main');
    console.log('redirect useeffect running!', user);
  }, [code, user]);
  return <p>Authorizing your Accout ...</p>;
};

export default Redirect;
