import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BackDrop from '../backDrop/BackDrop';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as actions from '../../action/noticeAction';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  card: {
    width: '100%',
  },
  input: {
    display: 'none',
  },
}));

function AddNotice({ loading, postNotice, ...props }) {
  const classes = useStyles();

  const [text, setText] = useState('');
  const [heading, setHeading] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    postNotice({ text, heading });
    setText('');
    setHeading('');
    props.history.push('/notice');
  };

  return (
    <Fragment>
      {loading && <BackDrop open={loading} />}
      <form onSubmit={(e) => onSubmitHandler(e)} encType='multipart/form-data'>
        <Grid container justify='center'>
          <Grid item sm={6} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5'>Add Notice</Typography>
                <Box my={4}>
                  <TextField
                    fullWidth
                    id='outlined-helperText'
                    name='heading'
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    label='Heading'
                    helperText=''
                    variant='outlined'
                    type='text'
                  />
                </Box>
                <Box mb={4}>
                  <TextField
                    fullWidth
                    name='text'
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline
                    rows={6}
                    label='Text'
                    helperText=''
                    variant='outlined'
                  />
                </Box>

                <Button type='submit' variant='contained' color='primary' fullWidth>
                  <CloudUploadIcon /> Add Notice
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    postNotice: (body) => dispatch(actions.postNotice(body)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.notice.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNotice);
