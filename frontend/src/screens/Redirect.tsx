import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchToken } from '../actions/spotifyAuthActions';
import useQuery from '../hooks/useQuery';
import { RootState } from '../store';

const Redirect = () => {
  const user = useSelector((state: RootState) => state.spotifyAuth?.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const code = query.get('code');

  const body = {
    code,
  };

  useEffect(() => {
    dispatch(fetchToken(body));
    if (user) history.push('/main');
  }, [code, user]);
  return <p>Authorizing your Accout ...</p>;
};

export default Redirect;
