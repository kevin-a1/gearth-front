import React, { useEffect, useRef, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import DialogActivity from "./DialogActivity";
import { Toast } from 'primereact/toast';
import { useHistory, useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
import { SplitButton } from "primereact/splitbutton";
import { ToggleButton } from "primereact/togglebutton";
import { importXML, _saveXML } from './utils/helpers';
import { eventsBpmn, BLANK_XML } from './utils/variables';
import { getProcessById, updateProcessXML } from "../../../../redux/actions/process.actions";
import { useSelector } from "react-redux";
import { createActivity, deleteActivityByTask, getActivityByTask, updateActivityByTask } from "../../../../redux/actions/activity.actions";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import '../../../assets/scss/BPMN-JS.scss';

const BuilderBPMN = () => {

    const location = useLocation();
    const history = useHistory();
    if (!location.state?.process) history.push('/admin/processes');
    const process = location.state?.process;

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>
                Build BPMN activities at <i><a>"{process?.name}"</a></i>
            </h2>
            { BPMNModeler(history, process) }
        </>
    )
}

const BPMNModeler = (history, process) => {
    
    const [ theme, setTheme ] = useState(true); //true -> Linght theme, false -> Dark theme
    const [ dialog, setDialog ] = useState(false); //true -> Open Activity Dialog, false -> Close Activity Dialog
    const [ activity, setActivity ] = useState({}); //Activity selected for dialog
    const [ defaultFillColor, setDefaultFillColor ] = useState('#FFF');
    const [ defaultStrokeColor, setDefaultStrokeColor ] = useState('#000');
    const [ saving, setSaving ] = useState(false);
    const [ diagram, setDiagram ] = useState(''); //XML that modeler was working
    const toast  = useRef(null);
    const user = useSelector((state) => state.LoginState.data);
    
    const menuItems = [
        {
            label: 'Image (SVG)',
            icon: 'pi pi-image',
            command: function(e) {
              console.log(e)
            },
        },
        {
            label: 'Image (PNG)',
            icon: 'pi pi-image',
            command: function() {
              console.log('PNG')
            },
        },
        {
            separator: true,
        },
        {
            label: 'File (XML)',
            icon: 'pi pi-file',
            command: function() {
                _saveXML(diagram);
            },
        },
        {
            label: 'File (PDF)',
            icon: 'pi pi-file',
            command: function() {
              console.log('PDF')
            },
        },
    ];

    useEffect(() => {
        if (theme) {
            setDefaultFillColor('#333');
            setDefaultStrokeColor('#fff')
        } else {
            setDefaultFillColor('#fff');
            setDefaultStrokeColor('#333')
        }
    }, [ theme ])

    const saveChanges = async (modeler) => {

        try {
            const result = await modeler.saveXML({ format: false });
            const { xml } = result;

            setDiagram( xml );
            setSaving(true);

            updateProcessXML(process?.id, xml, user?.access_token).then((data) => {
                setSaving(false); //Update xml string to database
            });

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        const container = document.getElementById("container");
        container.innerHTML = ''; //Clean modeler container

        const modelerValues = {
            container,
            keyboard: {
                bindTo: document,
            },
            bpmnRenderer: {
                defaultFillColor: defaultFillColor,
                defaultStrokeColor: defaultStrokeColor }
        }

        const modeler = new Modeler({ ...modelerValues });
        const eventBus = modeler.get('eventBus');

        getProcessById(process?.id, user?.access_token).then((data) => {

            if (data?.xml_body) { 
                importXML(setDiagram, modeler, data?.xml_body); //Import xml for data base of activity
            } else { 
                importXML(setDiagram, modeler, BLANK_XML); //Import blank xml if activity haven't xml created
            }

            eventsBpmn.forEach(function(event) {
                eventBus.on(event, function(e) {

                    if (event === 'element.contextmenu') {
                        if (e?.element?.type === 'bpmn:Task') {
                            
                            getActivityByTask(e?.element?.id, user?.access_token).then(response => {
                                setActivity(response);
                                setDialog(true);
                            });

                        } return false;
                    }

                    if (event === 'commandStack.changed') {
                        saveChanges(modeler);
                    }

                    if (event === 'shape.removed') {

                        if (e?.element?.type === 'bpmn:Task') {
                            deleteActivityByTask(e?.element?.id, user?.access_token).then(response => {
                                toast.current.show({ 
                                    severity: 'success', 
                                    summary: 'Deleted Activity', 
                                    detail: `${e?.element?.businessObject?.name}`, life: 2000 }
                                );
                            });
                        }
                        
                    }

                    if (event === 'shape.changed') {

                        if (e?.element?.type === 'bpmn:Task') {

                            getActivityByTask(e?.element?.id, user?.access_token).then(response => {

                                //Shape changed data
                                const NAME = e?.element?.businessObject?.name;
                                const ID = e?.element?.id; //Shape id (task_id)

                                if (Object.keys(response).length === 0) {

                                    const dataActivity = {
                                        name: (NAME != undefined) ? NAME:'',
                                        processId: process?.id,
                                        taskId: ID,
                                    }

                                    createActivity(dataActivity, user?.access_token).then(responseCreated => {
                                        toast.current.show({ 
                                            severity: 'success', 
                                            summary: 'Created Activity', 
                                            detail: `${responseCreated?.name}`, life: 2000 }
                                        );
                                    });

                                } else if (response?.status === 0) {
                                    
                                    deleteActivityByTask(ID, user?.access_token).then(responseDeleted => {
                                        toast.current.show({ 
                                            severity: 'success', 
                                            summary: 'Restored  Activity', 
                                            detail: `${NAME}`, life: 2000 }
                                        );
                                    });

                                } else if (NAME && response?.name != NAME) {
                                    
                                    updateActivityByTask(response?.task_id, { name: NAME }, user?.access_token).then(responseUpdated => {
                                        toast.current.show({ 
                                            severity: 'success', 
                                            summary: 'Edited Activity', 
                                            detail: `${responseUpdated?.name}`, life: 2000 }
                                        );
                                    });
                                }
                            });
                        }
                    }
                });
            });
        })
        
        return () => {
            eventsBpmn.forEach(function(event) {
                eventBus.off(event); //Clean all events of bpmn modeler of events list
            });
        }

    }, [ theme ])

    const optionsTemplate = () => {

        const leftTemplate = (
            <>
                <SplitButton
                    onClick={ (e) => _saveXML(diagram) }
                    label="Download" icon="pi pi-download" model={ menuItems }
                    className="p-button-info" ></SplitButton>

                <ToggleButton
                    className="p-ml-1" checked={ theme }
                    onChange={(e) => setTheme(e.value)}
                    onIcon="pi pi-sun" offIcon="pi pi-moon"
                    onLabel="Ligth" offLabel="Dark" />
            </>
        );

        const rightTemplate = (
            <>
                <Button
                    style={{ width: '93px' }}
                    className="p-button-danger p-mx-1"
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={ () => history.push('/admin/processes') } />
                <Button
                    style={{ width: '93px' }}
                    className="p-button-success"
                    label="Save"
                    icon="pi pi-save" />
            </>
        );

        const centerTemplate = (
            <>
                <Button
                    className="p-button-text"
                    label={ (saving) ? 'Saving changes ... ' : 'Changes saved' }
                    icon={ (saving) ? 'pi pi-spin pi-spinner': 'pi pi-check' } />
            </>
        );

        return (
            <div className="card p-mb-3 p-pb-2 p-shadow-3" style={{ borderRadius: '7px' }}>
                <div className="p-grid">
                    <div className="p-col" style={{ textAlign: 'left' }}>{ leftTemplate }</div>
                    <div className="p-col" style={{ textAlign: 'center' }}>{ centerTemplate }</div>
                    <div className="p-col" style={{ textAlign: 'right' }}>{ rightTemplate }</div>
                </div>
            </div>
        );
    }
    
    return (
        <>
            { optionsTemplate() }

            <div
                className="p-shadow-10 p-p-2"
                id="container"
                style={{
                    height: "95vh",
                    background: `${(theme ? '#eee' : '#293241' )}`,
                    borderRadius: '10px',
                    color: '#000',
                }}
            ></div>

            <Toast ref={ toast } />

            <DialogActivity 
                dialog={ dialog }
                setDialog={ setDialog }
                process={ process }
                activity={ activity } />
        </>
    );
}

export default BuilderBPMN;