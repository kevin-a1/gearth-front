import React, { useState, useEffect, useRef }from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as surveyActions from '../../../redux/actions/survey.actions';


import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Poll from './Poll/Poll';

import {Toast} from 'primereact/toast';


import { useHistory, useLocation } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

const Polls = () => {

    const dispatch = useDispatch();
    let history = useHistory();
    const location = useLocation();
    const user = useSelector((state) => state.LoginState.data);

    if (!location.state?.process) history.push('/admin/processes');

    const process = location.state?.process; //Process of the activity

    const [ open, setOpen ] = useState(false);

    const [ pollTitle, setPollTitle ] = useState("");
    const [ pollDescription, setPollDescription ] = useState("");
    const [ emptyT, setEmptyT ] = useState(false);
    const [ emptyD, setEmptyD ] = useState(false);

    const toast = useRef(null);

    const cancelAddPoll = () =>{
        setOpen(false);
        setPollTitle("");
        setPollDescription("");
        setEmptyT(false);
        setEmptyD(false);
    };

    const createPoll = async () =>{
      let survey ={
        name:pollTitle,
        description:pollDescription,
      }
      if (survey.name !=='') {
        setEmptyT(false);
        if (survey.description !=='') {
          setEmptyD(false);
          const status = await dispatch(
            surveyActions.createSurvey(survey, process.id, user.access_token)
          );

          if (status !== 201) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred!', life: 3000 });
            return;
          }else {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Survey Created!', life: 3000 });
            setOpen(false);
            setPollTitle("");
            setPollDescription("");
            setEmptyT(false);
            setEmptyD(false);
          }
        }else{
          setEmptyD(true)
        }
      }else{
        setEmptyT(true)
      }
    };
    const leftToolbarTemplate = () => {
          return (
              <>
                  <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ () =>{setOpen(true)} } />
                  <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2" onClick={ () =>{console.log(process);}} />
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
      <Toast ref={toast}/>
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
                        onChange={(e) =>{setPollTitle(e.target.value)}}
                        error={emptyT === true}
                        helperText={emptyT === true ? 'Empty field!' : ' '} />
                        <br></br>
                        <TextField
                          autoFocus
                          margin='dense'
                          id='description'
                          label='Poll Description'
                          type='text'
                          fullWidth
                          value={pollDescription}
                          error={emptyD === true}
                          helperText={emptyD === true ? 'Empty field!' : ' '}
                          onChange={(e) =>{setPollDescription(e.target.value)}} />
                          <br></br>
                    </DialogContent>
                    <DialogActions>
                      <Button label='Cancel' className="p-button-text p-mr-2 p-mb-2" onClick={cancelAddPoll} />
                      <Button label='Create' className="p-button-text p-mr-2 p-mb-2" onClick={createPoll} />
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
