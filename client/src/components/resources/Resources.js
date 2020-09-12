import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Resource from './Resource';
import * as actions from '../../action/resourcesAction';
import BackDrop from '../backDrop/BackDrop';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { department, semester } from '../../util/data';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
function Resources({ getResources, resources, loading }) {
  const classes = useStyles();
  useEffect(() => {
    if (resources.length <= 0) {
      getResources();
    }
  }, [getResources]);

  const [filterValue, setFilterValue] = React.useState({ department: '*', semester: '*' });
  const handleChange = (e) => {
    setFilterValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Fragment>
      {loading && <BackDrop open={loading} />}
      <Grid container justify='center' alignItems='center'>
        <Grid item xs={10}>
          <Box my={2}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant='h5'>
                  Filter
                </Typography>
                <Box component='span' mr={2}>
                  <TextField
                    id='outlined-select-currency'
                    select
                    label='Department'
                    value={filterValue.department}
                    onChange={(e) => {
                      handleChange(e);
                      getResources(e.target.value, filterValue.semester);
                    }}
                    helperText='filter by department'
                    variant='outlined'
                    name='department'
                  >
                    {department.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box component='span'>
                  <TextField
                    id='outlined-select-currency'
                    select
                    label='Semester'
                    value={filterValue.semester}
                    onChange={(e) => {
                      handleChange(e);
                      getResources(filterValue.department, e.target.value);
                    }}
                    helperText='Filter by semester'
                    variant='outlined'
                    name='semester'
                  >
                    {semester.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item>
          {resources.length <= 0 ? (
            <h1>No Resource Found</h1>
          ) : (
            resources.map((resource) => {
              return (
                <Fragment key={resource._id}>
                  <Resource resource={resource} />
                  <Divider />
                </Fragment>
              );
            })
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    resources: state.resources.resources,
    loading: state.resources.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getResources: (department, semester) => dispatch(actions.getResources(department, semester)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Resources);
