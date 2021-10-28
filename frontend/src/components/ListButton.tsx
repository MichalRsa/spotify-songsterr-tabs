import * as React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
  button: {
    display: 'block',
    marginTop: '.6rem',
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'green',
    },
  },
}));

const ListButton = ({ btnAction }: { btnAction: string }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Button
      variant='contained'
      className={classes.button}
      onClick={() => history.push(btnAction)}
    >
      More
    </Button>
  );
};

export default ListButton;
