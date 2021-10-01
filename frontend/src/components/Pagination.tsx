/* eslint-disable no-console */
import { Button, Grid } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../store';
// import useQuery from '../hooks/useQuery';

const Pagination = () => {
  const history = useHistory();

  //   const query = useQuery();
  //   const QueryOffset = query.get('offset');
  //    const QueryOffsetNumber =
  //     typeof QueryOffset === 'string' && parseFloat(QueryOffset);

  const pagination = useSelector(
    (state: RootState) => state.userAlbums?.albums
  );

  if (pagination) {
    const pagesArray: Array<number> = [];
    const { total, limit, offset, next, previous } = pagination;
    const numOfPages = total / limit;
    for (let i = 0; i <= numOfPages; i += 1) {
      pagesArray.push(i);
    }
    //     console.log(pagesArray);
    return (
      <Grid container justifyContent='center'>
        <Grid item>
          <Button
            disabled={!previous}
            onClick={() =>
              history.push(
                `/user/albums?limit=${limit}&offset=${offset - limit}`
              )
            }
          >
            previous
          </Button>

          {pagesArray.map((pageNum) => (
            <Button
              disabled={offset === pageNum * limit}
              onClick={() =>
                history.push(
                  `/user/albums?limit=${limit}&offset=${pageNum * limit}`
                )
              }
            >
              {pageNum + 1}
            </Button>
          ))}

          <Button
            disabled={!next}
            onClick={() =>
              history.push(
                `/user/albums?limit=${limit}&offset=${offset + limit}`
              )
            }
          >
            next
          </Button>
        </Grid>
      </Grid>
    );
  }
  return null;
};

export default Pagination;
