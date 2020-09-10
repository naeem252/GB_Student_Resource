import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import * as actions from '../../action/studentAction';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  avatarLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
}));

function MyAppBar({ handleDrawerToggle, isAuthenticated, student, getStudent }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar position='static'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Resource Shared
          </Typography>
          {isAuthenticated ? (
            <Fragment>
              <Link
                className={classes.avatarLink}
                to={`/profile/${student._id}`}
                onClick={() => getStudent(student._id)}
              >
                <Avatar alt={student.name} src={`/images/studentImages/${student.image}`} />
                <Box ml={1}>
                  <Typography variant='inherit'>{student.name.split(' ')[0]}</Typography>
                </Box>
              </Link>
              <Hidden xsDown>
                <Link to='/logout'>
                  <Button color='inherit'>Log out</Button>
                </Link>
              </Hidden>
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' style={{ marginLeft: 'auto' }}>
                <Link to='/login'>Login</Link>
              </Button>
              <Hidden xsDown>
                <Button color='inherit'>
                  <Link to='/signup'>Sign up</Link>
                </Button>
              </Hidden>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

MyAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStudent: (id) => dispatch(actions.getStudent(id)),
  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    student: state.auth.student,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar);
