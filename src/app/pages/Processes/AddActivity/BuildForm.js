import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FormEditor } from '@bpmn-io/form-js-editor';
import { BLANK_SCHEMA } from './utils/variables';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import '@bpmn-io/form-js-editor/dist/assets/form-js-editor.css';
import '@bpmn-io/form-js-editor/dist/assets/dragula.css';
import '@bpmn-io/form-js/dist/assets/form-js.css';
import PreviewForm from './PreviewForm';

const BuildForm = props => {

    const location = useLocation();
    const history = useHistory();
    const [ dialog, setDialog ] = useState(false);
    const [ form, setForm ] = useState( BLANK_SCHEMA );
    
    if (!location.state?.process || 
        !location.state?.activity || 
        !location.state?.action || 
        !location.state?.xml) history.push('/admin/processes');

    //Values of parameters
    const process = location.state?.process; //Process of the activity
    const action = location.state?.action; //AddActivity module action (edit or new)
    const activity = location.state?.activity; //Current activity
    const xml = location.state?.xml; //Model of BPMN that is working now

    useEffect(() => {
        const container = document.getElementById('form')
        container.innerHTML = '';

        const formEditor = new FormEditor({
            container: container,
        });
        
        formEditor.importSchema(form);

        formEditor.on('changed', (event) => {
            setForm(event?.schema);
            console.log(event?.schema?.components);
        });

        return () => {
            formEditor.off('changed');
            formEditor.clear();
            formEditor.destroy();
        }

    }, [])

    const optionsTemplate = () => {

        const handleButton = (e) => {

            history.push({
                pathname: '/admin/add-activity',
                state: {
                    process: process,
                    xml: xml,
                    action: action,
                },
            });
        }

        const leftTemplate = (
            <>
                <Button
                    className="p-button-info"
                    label="Preview"
                    icon="pi pi-eye"
                    onClick={ () => setDialog(true) } />
            </>
        );

        const rightTemplate = (
            <>
                <Button 
                    style={{ width: '93px' }}
                    className="p-button-danger p-mx-1" 
                    label="Cancel" 
                    icon="pi pi-times"
                    value="cancel"
                    onClick={ handleButton } />
                <Button
                    type="submit"
                    style={{ width: '93px' }} 
                    className="p-button-success" 
                    label="Save" 
                    icon="pi pi-check"
                    value="save"
                    onClick={ handleButton } />
            </>
        );

        return (
            <div className="card p-mb-3 p-p-2 p-shadow-3" style={{ borderRadius: '17px' }}>
                <Toolbar className="p-m-1 p-toolbar" left={ leftTemplate } right={ rightTemplate }></Toolbar>
            </div>
        );
    }

    const confirmationDialogFooter = (
        <>
            <Button
                type="button" label="Close"
                onClick={() => setDialog(false)} className="p-button-text p-button-danger" />
        </>
    );

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Add form at <i><a>"{ activity?.text }"</a></i></h2>

            { optionsTemplate() }
            
            <div className="card" style={{ borderRadius: '7px' }}>
                <div
                    id="form"
                    style={{ 
                        color: '#000',
                        borderRadius: '7px'
                    }} >
                </div>
            </div>

            <Dialog 
                header="Preview" visible={ dialog } 
                onHide={() => setDialog(false)}
                style={{ width: '500px' }} modal 
                footer={ confirmationDialogFooter }>

                <div className="confirmation-content">
                    <PreviewForm form={ form } />
                </div>

            </Dialog>
        </>
    );
}

export default BuildForm