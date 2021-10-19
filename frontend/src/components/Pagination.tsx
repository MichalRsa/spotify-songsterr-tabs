/* eslint-disable no-console */
import {
  Button,
  Collapse,
  Grid,
  makeStyles,
  // List,
  // ListItem,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
  numberButtonsList: {
    transform: 'translateX(-15px)',
  },
  numberButtonSmallWidth: {
    marginBottom: '10px',
  },
  numberButtonLargeWidth: {
    margin: '0 5px',
  },
}));

const Pagination = ({ pagination, route }: any) => {
  const history = useHistory();

  const classes = useStyles();

  const width = useMediaQuery((theme: Theme) => theme.breakpoints.up(420));

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const desktopPagination = (
    pagesArray: Array<number>,
    offset: number,
    limit: number
  ) =>
    pagesArray.map((pageNum) => (
      <Button
        className={classes.numberButtonLargeWidth}
        variant='outlined'
        key={pageNum}
        disabled={offset === pageNum * limit}
        onClick={() =>
          history.push(`${route}?limit=${limit}&offset=${pageNum * limit}`)
        }
      >
        {pageNum + 1}
      </Button>
    ));
  const mobilePagination = (
    pagesArray: Array<number>,
    offset: number,
    limit: number
  ) => (
    <Grid container>
      {!open && (
        <Button
          onClick={handleClick}
          variant='outlined'
          className={classes.numberButtonsList}
        >
          {offset / limit + 1}
        </Button>
      )}
      <Collapse in={open} timeout='auto' unmountOnExit>
        {/* <List component='div' disablePadding> */}
        {pagesArray.map((pageNum) => (
          // <ListItem>
          <Grid item className={classes.numberButtonsList}>
            <Button
              className={classes.numberButtonSmallWidth}
              variant='outlined'
              key={pageNum}
              disabled={offset === pageNum * limit}
              onClick={() => {
                setOpen(!open);
                history.push(
                  `${route}?limit=${limit}&offset=${pageNum * limit}`
                );
              }}
            >
              {pageNum + 1}
            </Button>
          </Grid>
          // </ListItem>
        ))}
        {/* </List> */}
      </Collapse>
    </Grid>
  );

  if (pagination) {
    const pagesArray: Array<number> = [];
    const { total, limit, offset, next, previous } = pagination;
    const numOfPages = total / limit;
    for (let i = 0; i < numOfPages; i += 1) {
      pagesArray.push(i);
    }
    return (
      <Grid
        container
        justifyContent={width ? 'center' : 'space-between'}
        spacing={2}
      >
        <Grid item>
          <Button
            variant='contained'
            disabled={!previous}
            onClick={() =>
              history.push(`${route}?limit=${limit}&offset=${offset - limit}`)
            }
          >
            previous
          </Button>
        </Grid>

        <Grid item>
          {width
            ? desktopPagination(pagesArray, offset, limit)
            : mobilePagination(pagesArray, offset, limit)}
        </Grid>

        <Grid item>
          <Button
            variant='contained'
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
