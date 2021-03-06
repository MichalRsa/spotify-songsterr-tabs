import React from 'react';
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../actions/spotifyAuthActions';
import { RootState } from '../store';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
    },
    colorBgc: { backgroundColor: theme.palette.secondary.dark },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: 'white',
      // display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
);

const NavBar = () => {
  const user = useSelector((store: RootState) => store.spotifyAuth?.user);

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(userLogout(history));
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push('/')}>
        <IconButton
          aria-label='home page'
          aria-controls='primary-search-home-page'
          aria-haspopup='true'
          color='inherit'
        >
          <HomeRoundedIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={() => history.push('/search')}>
        <IconButton
          aria-label='search'
          // aria-controls={menuId}
          aria-haspopup='true'
          color='inherit'
        >
          <SearchIcon />
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.colorBgc}>
        <Toolbar>
          <Link className={classes.link} to='/'>
            {location.pathname !== '/search' && (
              <Typography className={classes.title} variant='h6' noWrap>
                Spotify Tab Finder
              </Typography>
            )}
          </Link>
          {/* {location.pathname !== '/search' ? (
            <IconButton
              edge='end'
              aria-label='search'
              // aria-controls={menuId}
              aria-haspopup='true'
              color='inherit'
              onClick={() => history.push('/search')}
            >
              <SearchIcon />
            </IconButton>
          ) : (
            <SearchBar />
          )} */}
          {location.pathname === '/search' && <SearchBar />}
          <div className={classes.grow} />

          {user && (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge='end'
                  aria-label='home page'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  color='inherit'
                  onClick={() => history.push('/')}
                >
                  <HomeRoundedIcon />
                </IconButton>
              </div>
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge='end'
                  aria-label='search'
                  // aria-controls={menuId}
                  aria-haspopup='true'
                  color='inherit'
                  onClick={() => history.push('/search')}
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default NavBar;
