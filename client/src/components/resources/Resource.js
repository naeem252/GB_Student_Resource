import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import pdf from '../../images/PDF_file_icon.svg';
import { incrementDownload } from '../../action/resourcesAction';
import axios from 'axios';
import Moment from 'react-moment';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '100%',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '50px',
    maxHeight: '50px',
  },
}));

function Resource({ incrementDown, resource }) {
  const classes = useStyles();
  const onDownloadHandler = async (e, id, fileName) => {
    incrementDown(id);
    try {
      // await axios.get(`/api/v1/resource/downloadResource/${id}/${fileName}`);
      await axios.patch(`/api/v1/resource/downloadResource/${id}/${fileName}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item sm={8} xs={12}>
          <Paper className={classes.paper}>
            <Grid alignItems='center' container spacing={2}>
              <Grid item>
                <img className={classes.img} alt='complex' src={pdf} />
              </Grid>
              <Grid alignItems='center' item xs={12} sm container>
                <Grid justify='center' item xs container direction='column' spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant='h5'>
                      {resource.pdf}
                    </Typography>
                    <Link to={`/profile/${resource.student._id}`}>
                      <Typography style={{ display: 'flex', alignItems: 'center' }} variant='body2' gutterBottom>
                        uploaded by
                        <Avatar src={`/images/studentImages/${resource.student.image}`} /> &nbsp;
                        {resource.student.name.split(' ')[0]}
                      </Typography>
                    </Link>
                    <Typography variant='body2' color='textSecondary'>
                      <Moment format='DD/MM/YYYY'>{resource.createdAt}</Moment> &nbsp;
                      <Typography variant='inherit'>{resource.size} mb</Typography> &nbsp;
                      <Typography variant='inherit'>{resource.download} downloaded</Typography> &nbsp;
                      <Typography variant='inherit'>course code ({resource.courseCode})</Typography> &nbsp;
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Link
                    to={`/resources/${resource.pdf}`}
                    target='_blank'
                    download
                    className='btn btn-resource-down-btn'
                    onClick={(e) => onDownloadHandler(e, resource._id, resource.pdf)}
                  >
                    <Button variant='contained' color='primary' size='large'>
                      <CloudDownloadIcon />
                      &nbsp; Download
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    incrementDown: (id) => dispatch(incrementDownload(id)),
  };
};

export default connect(null, mapDispatchToProps)(Resource);
