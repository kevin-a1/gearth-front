import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Viewer";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
import { SplitButton } from "primereact/splitbutton";
import { ToggleButton } from "primereact/togglebutton";
import { _saveXML } from './utils/helpers';
import { eventsBpmn, PIZZA_EXAMPLE } from './utils/variables';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import '../../../assets/scss/BPMN-JS.scss';

const ViewerBPMN = () => {

    const location = useLocation();
    const history = useHistory();
    
    if (!location.state?.process) history.push('/admin/processes');

    const process = location.state.process;
    const xml = location.state?.xml;

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>
                View activities of <i><a>"{process?.name}"</a></i>
            </h2>
            { BPMNModeler(history, process, xml) }
        </>
    )
}

const BPMNModeler = (history, process, xml) => {

    const [ theme, setTheme ] = useState(true);
    const [ defaultFillColor, setDefaultFillColor ] = useState('#FFF');
    const [ defaultStrokeColor, setDefaultStrokeColor ] = useState('#000');
    const [ diagram ] = useState( PIZZA_EXAMPLE );

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
    
        const modeler = new Modeler({
            ...modelerValues
        });
    
        if (diagram.length > 0) {
    
            modeler.importXML(diagram).then(({ warnings }) => {
    
                if (warnings.length) console.log("Warnings", warnings);
    
                const canvas = modeler.get("canvas");
                canvas.zoom("fit-viewport", 'auto');
    
            }).catch((err) => {
                console.log("error", err); 
            });
    
            const eventBus = modeler.get('eventBus');
    
            eventsBpmn.forEach(function(event) {
                eventBus.on(event, function(e) {
                    if (event == 'element.contextmenu') {
                        return false;
                    }
                });
            });
        }
        return modeler;
    }, [ theme ])

    const optionsTemplate = () => {

        const leftTemplate = (
            <>
                <SplitButton 
                    onClick={ (e) => _saveXML(diagram) } 
                    label="Download" icon="pi pi-download" model={ menuItems } 
                    className="p-button-info"></SplitButton>

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
                    label="Back" 
                    icon="pi pi-arrow-left"
                    onClick={ () => history.push('/admin/processes') } />
            </>
        );

        return (
            <div className="card p-mb-3 p-pb-2 p-shadow-3" style={{ borderRadius: '17px' }}>
                <div className="p-grid">
                    <div className="p-col" style={{ textAlign: 'left' }}>{ leftTemplate }</div>
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
                    border: `1px solid ${(theme) ? '#585858' : '#gray'}`,
                    width: "90vw",
                    height: "95vh",
                    margin: "auto",
                    background: `${(theme ? '#eee' : '#293241' )}`,
                    borderRadius: '17px',
                    color: '#000',
                }}
            ></div>
        </>
    );
}

export default ViewerBPMN;