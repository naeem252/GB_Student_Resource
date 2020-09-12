import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Avatar from '@material-ui/core/Avatar';
import GetAppIcon from '@material-ui/icons/GetApp';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  myAvatar: {
    width: '60px',
    height: '60px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function Resource({ notice }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const formatAMPM = (date) => {
    var d = new Date(date),
      minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
      hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
      ampm = d.getHours() >= 12 ? 'pm' : 'am',
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      days[d.getDay()] +
      ' ' +
      months[d.getMonth()] +
      ' ' +
      d.getDate() +
      ' ' +
      d.getFullYear() +
      ' ' +
      hours +
      ':' +
      minutes +
      ampm
    );
  };
  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item sm={8} xs={12}>
          <Paper className={classes.paper}>
            <Grid alignItems='center' container spacing={2}>
              <Grid item>
                <Avatar
                  className={classes.myAvatar}
                  src={`/images/studentImages/${notice.cr.image}`}
                  alt={notice.name}
                />
              </Grid>
              <Grid alignItems='center' item xs={12} sm container>
                <Grid justify='center' item xs container direction='column' spacing={2}>
                  <Grid item xs>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                      >
                        <Typography className={classes.heading}>{notice.heading}</Typography>
                        <Typography className={classes.secondaryHeading}>{notice.text.substr(0, 5)}...</Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ display: 'block' }}>
                        <Typography variant='subtitle1'>{notice.text}</Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {formatAMPM(notice.createdAt)}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Resource;
