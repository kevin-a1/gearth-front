import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import surveyImg from '../../../assets/img/survey.svg';
import formImg from '../../../assets/img/form.svg';
import socialImg from '../../../assets/img/social-media.svg';
import { useHistory, useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
import { SplitButton } from "primereact/splitbutton";
import { ToggleButton } from "primereact/togglebutton";
import { Dialog } from "primereact/dialog";
import { _saveXML } from './utils/helpers';
import { eventsBpmn, PIZZA_EXAMPLE, BLANK_XML } from './utils/variables';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import '../../../assets/scss/BPMN-JS.scss';

const AddActivity = () => {

    const location = useLocation();
    const history = useHistory();

    if (!location.state?.process || !location.state?.action) history.push('/admin/processes');

    const process = location.state.process;
    const action = location.state?.action;
    const xml = location.state?.xml;

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>
                <i className={`${(action == 'edit') ? 'pi pi-pencil' : 'pi pi-plus'} p-mr-2`} style={{ fontSize: '1.5rem' }}></i>
                { (action == 'edit') ? 'Edit' : 'Add new' } activities at <i><a>"{process?.name}"</a></i>
            </h2>
            { BPMNModeler(history, process, action, xml) }
        </>
    )
}

const BPMNModeler = (history, process, action, xml) => {

    const [ theme, setTheme ] = useState(true);
    const [ dialog, setDialog ] = useState(false);
    const [ activity, setActivity ] = useState(null)
    const [ defaultFillColor, setDefaultFillColor ] = useState('#FFF');
    const [ defaultStrokeColor, setDefaultStrokeColor ] = useState('#000');
    const [ saving, setSaving ] = useState(false)
    const [ diagram, setDiagram ] = useState(
        ( xml ) ? xml :
        (action == 'edit')  ? PIZZA_EXAMPLE : BLANK_XML
    );

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
            const { xml: xmlUpdated } = result;
            setDiagram( xmlUpdated );
            setSaving(true);

            setTimeout(() => {
                setSaving(false);
            }, 2000);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        const container = document.getElementById("container");
        container.innerHTML = '';

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

        if (diagram.length > 0) {

            modeler.importXML(diagram).then(({ warnings }) => {

                if (warnings.length) console.log("Warnings", warnings);

                const canvas = modeler.get("canvas");
                canvas.zoom("fit-viewport", 'auto');

            }).catch((err) => {
                console.log("error", err);
            });

            eventsBpmn.forEach(function(event) {
                eventBus.on(event, function(e) {
                    if (event == 'element.contextmenu') {

                        if (e?.element?.type == 'bpmn:Task') {
                            setActivity({
                                id: e?.element?.id,
                                text: e.gfx.textContent,
                            });
                            setDialog(true);
                        }
                        return false;
                    }

                    if (event == 'commandStack.changed') {
                        saveChanges(modeler);
                    }
                });
            });
        }

        return () => {
            eventsBpmn.forEach(function(event) {
                eventBus.off(event);
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
            <div className="card p-mb-3 p-pb-2 p-shadow-3" style={{ borderRadius: '17px' }}>
                <div className="p-grid">
                    <div className="p-col" style={{ textAlign: 'left' }}>{ leftTemplate }</div>
                    <div className="p-col" style={{ textAlign: 'center' }}>{ centerTemplate }</div>
                    <div className="p-col" style={{ textAlign: 'right' }}>{ rightTemplate }</div>
                </div>
            </div>
        );
    }

    const confirmationDialogFooter = (
        <>
            <Button
                className="p-button-text p-button-danger"
                type="button" label="Cancel"
                onClick={() => setDialog(false)} />
        </>
    );

    const headerDialogHeader = () => {
        return (
            <>
                <span className="p-d-block p-text-center" style={{ fontSize: '1.1rem' }}>
                    Options for <a style={{ fontSize: '1rem' }}><i>{activity?.text}</i></a>
                </span>
            </>
        );
    }

    return (
        <>
            { optionsTemplate() }

            <div
                className="p-shadow-10 p-p-2"
                id="container"
                style={{
                    border: `1px solid ${(theme) ? '#585858' : '#gray'}`,
                    width: "90vw",
                    height: "95vh",
                    margin: "auto",
                    background: `${(theme ? '#eee' : '#293241' )}`,
                    borderRadius: '17px',
                    color: '#000',
                }}
            ></div>

            <Dialog
                header={ headerDialogHeader } visible={ dialog }
                onHide={() => setDialog(false)}
                style={{ width: '340px' }} modal
                footer={ confirmationDialogFooter }>

                <div className="p-text-center">

                    <div className="p-d-inline p-m-1">
                        <Button
                            className="p-button-success"
                            iconPos="bottom" label="Form"
                            onClick={() => history.push({
                                pathname: '/admin/build-form',
                                state: {
                                    process: process,
                                    activity: activity,
                                    xml: diagram,
                                    action: action,
                                },
                            })}>
                            <img className="p-button-icon p-pt-1" src={ formImg } style={{ width: '50px' }} />
                        </Button>
                    </div>

                    <div className="p-d-inline p-m-1">
                        <Button
                            className="p-button-primary"
                            iconPos="bottom" label="Survey"
                            onClick={() => history.push({
                                pathname: '/admin/surveys',
                                state: {
                                    process: process,
                                },
                            })}>
                            <img className="p-button-icon p-pt-1" src={ surveyImg } style={{ width: '50px' }} />
                        </Button>
                    </div>

                    <div className="p-d-inline p-m-1">
                        <Button className="p-button-info" iconPos="bottom" label="Social">
                            <img className="p-button-icon p-pt-1" src={ socialImg } style={{ width: '50px' }} />
                        </Button>
                    </div>

                </div>
            </Dialog>
        </>
    );
}

export default AddActivity;
