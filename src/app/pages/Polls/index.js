import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Poll from './Poll/Poll'


import { useHistory, useLocation } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

const Polls = () => {

    let history = useHistory();
    const location = useLocation();

    if (!location.state?.process) history.push('/admin/processes');

    const process = location.state?.process; //Process of the activity

    const [ open, setOpen ] = useState(false);

    const [ pollTitle, setPollTitle ] = useState("");
    const [ pollDescription, setPollDescription ] = useState("");

    const cancelAddPoll = () =>{
        setOpen(false);
        setPollTitle("");
        setPollDescription("");
      };

    const leftToolbarTemplate = () => {
          return (
              <>
                  <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ () =>{setOpen(true)} } />
                  <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2"  />
              </>
          )
      };

    const rightToolbarTemplate = () => {
          return (
              <>
                  <Button label="Return" icon="pi pi-return" className="p-button-help" />
              </>
          )
      };

    return(
      <>
        <div className='p-grid '>
          <div className='p-col-12'>
            <div className='card'>
              <Toolbar className="p-mb-4 p-toolbar" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar>
              <div>
                <div>
                  <Dialog open={open} onClose={()=> {setOpen( false )}} aria-labellebdy="form-dialog-title">
                    <DialogTitle id='form-dialog-title'>Create Poll</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Creating a new empty poll, just add poll name and description if you want.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Poll Name'
                        type='text'
                        fullWidth={false}
                        value={pollTitle}
                        onChange={(e) =>{setPollTitle(e.target.value)}} />
                        <br></br>
                        <TextField
                          autoFocus
                          margin='dense'
                          id='description'
                          label='Poll Description'
                          type='text'
                          fullWidth
                          value={pollDescription}
                          onChange={(e) =>{setPollDescription(e.target.value)}} />
                          <br></br>
                    </DialogContent>
                    <DialogActions>
                      <Button label='Cancel' className="p-button-danger p-button-text p-mr-2 p-mb-2" onClick={cancelAddPoll} />
                      <Button label='Create' className="p-button-text p-mr-2 p-mb-2" onClick={cancelAddPoll} />
                    </DialogActions>
                  </Dialog>
                </div>
                <div className='list-demo'>
                  <Poll processId={process.id}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Polls;
