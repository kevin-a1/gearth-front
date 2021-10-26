import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import { Paper, Typography } from '@material-ui/core';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import QuestionsTab from '../utils/QuestionsTab';
import ResponseTab from '../utils/ResponseTab';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
      justifySelf: 'center'
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      display: 'flex',
      alignContent: 'space-between',
      alignItems: 'center'
  }

  }));

const EditPoll = () => {


    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    const [formDeatils, setFormDetails] = useState({});
    const [openOfAlert, setOpenOfAlert] = useState(false);

    if (!location.state?.poll) history.push('/admin/surveys');

    const poll = location.state?.poll;

    const clipToClipboard = ()=>{
      navigator.clipboard.writeText(window.location.origin + "/s/" + formDeatils.id)
      handleClickOfAlert();
      handleClose();
    };

    const handleClickOfAlert = () => {
      setOpenOfAlert(true);
    };

    const handleCloseOfAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenOfAlert(false);
    };

    function sendForm(){
      handleClickOpen();
    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      let dat = poll[0];
      var formId = dat.id;
      if(formId !== undefined){
        setFormDetails(poll)
        console.log(formDeatils);
      }
    },[poll]);


    const optionsTemplate = () => {

      const leftTemplate = (
          <>
              <Typography variant="h6" noWrap style={{marginTop: '8.5px', color:'primary'}}>
                {formDeatils.name}
              </Typography>
          </>
      );

    const rightTemplate = (
        <>
          <IconButton aria-label="search" onClick={sendForm}>
            <i className="pi pi-send" style={{ color:'blue' ,fontSize: '2rem' }}></i>
          </IconButton>
        </>
    );

    const centerTemplate = (
        <>
          <Tabs
            className={classes.title}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered >
            <Tab label="Questions" />
            <Tab label="Responses" />
          </Tabs>
        </>
    );

    return (
        <div className="card p-mb-3 p-pb-2 p-shadow-3" style={{ borderRadius: '17px' }}>
              <div className="p-grid">
                  <div className="p-col" style={{ textAlign: 'left' }}>{ leftTemplate }</div>
                  <div className="p-col" style={{ textAlign: 'center' }}>{ centerTemplate }</div>
                  <div className="p-col" style={{ textAlign: 'right' }}>{ rightTemplate }</div>
              </div>
          </div>
    );
  };


    return (
        <div>
          <div>
            <div className={classes.root}>
              { optionsTemplate() }
            </div>
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{"Copy and share link."}</DialogTitle>
                <DialogContent>
                  <Paper className={classes.paper}>
                    <Grid container alignContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography variant="body1">{window.location.origin + "/s/" + formDeatils.id}</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton className={classes.button} aria-label="Add" size="medium" onClick={clipToClipboard} ><i className="pi pi-clone"></i></IconButton>
                      </Grid>
                    </Grid>
                    </Paper>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={openOfAlert}
                autoHideDuration={3000}
                onClose={handleCloseOfAlert}
                message="Copied to clipboard"
                action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseOfAlert}>
                    <i className="pi pi-times" style={{ color:'blue' ,fontSize: '1rem' }}></i>
                  </IconButton>
                </React.Fragment>}/>
            </div>
            <div>
              <TabPanel value={value} index={0}>
                <QuestionsTab formData={formDeatils} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ResponseTab formData={formDeatils} formId={formDeatils.id} />
              </TabPanel>
            </div>
          </div>
        </div>
      );
};

export default EditPoll;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other} >
        {value === index && (
          <Box>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
