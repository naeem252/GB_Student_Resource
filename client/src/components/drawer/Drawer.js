import React, { Fragment } from 'react';

//rect-router dom
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import AddBoxIcon from '@material-ui/icons/AddBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

function MyDrawer({ handleDrawerToggle, open, isAuthenticated, student, ...props }) {
  const { window } = props;
  const classes = useStyles();

  const drawer = (
    <div>
      <Divider />
      <List>
        <NavLink exact to='/resources'>
          <ListItem button>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary='All Resource' />
          </ListItem>
        </NavLink>
        <NavLink exact to='/add-resources'>
          <ListItem button>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary='Add Resource' />
          </ListItem>
        </NavLink>
        {isAuthenticated && (
          <Hidden smUp>
            <NavLink exact to='/logout'>
              <ListItem button>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary='Log out' />
              </ListItem>
            </NavLink>
          </Hidden>
        )}
        {!isAuthenticated && (
          <Fragment>
            <Hidden smUp>
              <NavLink exact to='/login'>
                <ListItem button>
                  <ListItemIcon>
                    <AddBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary='Log in' />
                </ListItem>
              </NavLink>
            </Hidden>
            <Hidden smUp>
              <NavLink exact to='/signup'>
                <ListItem button>
                  <ListItemIcon>
                    <AddBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary='Sign up' />
                </ListItem>
              </NavLink>
            </Hidden>
          </Fragment>
        )}
      </List>
      {isAuthenticated && (
        <Fragment>
          <Divider />
          <List>
            <NavLink exact to={`/profile/${student._id}`}>
              <ListItem button>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary='Profile' />
              </ListItem>
            </NavLink>
            <NavLink exact to='/edit-profile'>
              <ListItem button>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary='Edit Profile' />
              </ListItem>
            </NavLink>
          </List>
        </Fragment>
      )}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor='left'
          open={open}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

MyDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    student: state.auth.student,
  };
};

export default connect(mapStateToProps)(MyDrawer);
