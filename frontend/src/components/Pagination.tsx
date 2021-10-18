/* eslint-disable no-console */
import { Button, Grid } from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router';

const Pagination = ({ pagination, route }: any) => {
  const history = useHistory();

  if (pagination) {
    const pagesArray: Array<number> = [];
    const { total, limit, offset, next, previous } = pagination;
    const numOfPages = total / limit;
    for (let i = 0; i <= numOfPages; i += 1) {
      pagesArray.push(i);
    }
    return (
      <Grid container justifyContent='center'>
        <Grid item>
          <Button
            disabled={!previous}
            onClick={() =>
              history.push(`${route}?limit=${limit}&offset=${offset - limit}`)
            }
          >
            previous
          </Button>

          {pagesArray.map((pageNum) => (
            <Button
              key={pageNum}
              disabled={offset === pageNum * limit}
              onClick={() =>
                history.push(
                  `${route}?limit=${limit}&offset=${pageNum * limit}`
                )
              }
            >
              {pageNum + 1}
            </Button>
          ))}

          <Button
            disabled={!next}
            onClick={() =>
              history.push(`${route}?limit=${limit}&offset=${offset + limit}`)
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
