import React, { useState, useEffect } from 'react';
import useForm from '../../../../hooks/useForm';
import classNames from 'classnames';
import { useHistory, useLocation } from "react-router-dom";
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { InputTextarea } from 'primereact/inputtextarea';
import { findAllPeople } from '../../../../api/data';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { values } from 'lodash';

const AddProcess = ( ) => {

    const location = useLocation();
    const history = useHistory();
    const [ index, setIndex ] = useState(0)
    const [ submitted, setSubmitted ] = useState(false);
    const [ selectedAutoValue, setSelectedAutoValue ] = useState(null);
    const [ autoFilteredValue, setAutoFilteredValue ] = useState([]);
    const [ autoValue, setAutoValue ] = useState(null);
    const { values: process, setValues: setProcess, handleInputChange } = useForm({
        name: '',
        description: '',
        members: [],
    });

    let model;
    if (!location.state?.model) history.push('/admin/processes');
    else model = location.state.model;

    useEffect(() => {

        let data = []

        for (const p of findAllPeople()) {
            data.push({
                id: p.id,
                name: p.name,
                email: p.email,
                status: p.status,
            });
        }

        setAutoValue( data );
    }, []);

    const wizardItems = [
        { label: "Process's Info" },
        { label: 'Members' },
        { label: 'Confirmation' }
    ];

    const renderSwitch = (i) => {
        switch(i) {
            case 0:
                return infoTemplate();
            case 1:
                return membersTemplate();
            case 2:
                return confirmationTemplate();
            default:
                return infoTemplate();
        }
    }

    const infoTemplate = () => {

        return (
            <>
                <h3>
                    Information of Process
                </h3>
    
                <div className="p-col-12 p-md-8 p-lg-6 p-fluid" style={{ margin: 'auto' }} >
                    <div className="p-field">
                        <label htmlFor="name">Name</label>

                        <InputText id="name" name="name" value={ process?.name } onChange={ handleInputChange } required autoFocus className={classNames({ 'p-invalid': submitted && !process?.name })} placeholder="Enter the process's name ..." required autoComplete={false} />

                        { submitted && !process?.name && <small style={{ color: '#ef9a9a' }} className="p-invalid">Name is required.</small> }
                    </div>
    
                    <div className="p-field">
                        <label htmlFor="description">Description</label>

                        <InputTextarea id="description" name="description" value={ process?.description } onChange={ handleInputChange } required  className={classNames({ 'p-invalid': submitted && !process?.description })} rows={10} autoResize placeholder="Maximum 100 words ..." autoCapitalize="on" required />

                        { submitted && !process?.description && <small style={{ color: '#ef9a9a' }} className="p-invalid">Description is required.</small> }
                    </div>
                </div>    
            </>
        );
    }
    
    const membersTemplate = () => {

        const searchCountry = (event) => {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    setAutoFilteredValue([...autoValue]);
                }
                else {
                    setAutoFilteredValue(autoValue.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    }));
                }
            }, 100);
        };

        const bodyTemplate = (data, props) => {
            return (
                <>
                    <span className="p-column-title">{props.header}</span>
                    {data[props.field]}
                </>
            );
        };

        const statusBodyTemplate = (data) => {

            const status = (data.status || data.status == 1) ? 'instock' : 'outofstock';
            const statusValue = (data.status) ? 'Active' : 'Inactive';
    
            return (
                <>
                    <span className="p-column-title">Status</span>
                    <span className={`product-badge status-${status}`}>{statusValue}</span>
                </>
            )
        };
    
        return (
            
            <>
                <h3>
                    Members of Process
                </h3>

                <div className="p-col-12 p-md-8 p-lg-6 p-fluid" style={{ margin: 'auto' }}>
                    <div className="p-field">
                        <label htmlFor="plan_id">Members</label>

                        <AutoComplete placeholder="Search member by Email" id="members" multiple dropdown value={ selectedAutoValue } onChange={(e) => setSelectedAutoValue(e.value)} suggestions={ autoFilteredValue } completeMethod={ searchCountry } field="email" className={classNames({ 'p-invalid': submitted && !process?.members })} />

                        { submitted && !process?.members && <small className="p-invalid">Members is required.</small> }
                    </div>
                </div>

                <div className="p-grid crud-demo p-p-5">
                    <DataTable value={ selectedAutoValue } dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" emptyMessage="No teams found." >

                        <Column style={{ width: '110px' }} field="id" header="ID" sortable body={ bodyTemplate }></Column>
                        <Column field="email" header="Email" sortable body= { bodyTemplate }></Column>
                        <Column field="name" header="Name" sortable body= { bodyTemplate }></Column>
                        <Column field="status" header="Status" sortable body= { statusBodyTemplate }></Column>

                    </DataTable>
                </div>
            </>
        );
    }

    const confirmationTemplate = () => {
    
        return (
            <>
                <h3>
                    Confirmation
                </h3>

                <div className="p-col-12 p-md-8 p-lg-6 p-fluid" style={{ margin: 'auto' }} >
    
                    <div className="p-field">
                        <label htmlFor="start_date">Start Date</label>

                        <Calendar id="start_date" name="start_date" showIcon showButtonBar value={ values?.start_date } onChange={ handleInputChange } className={classNames({ 'p-invalid': submitted && !process?.start_date })} placeholder="Enter the start date ..." required ></Calendar>

                        { submitted && !process?.start_date && <small style={{ color: '#ef9a9a' }} className="p-invalid">Start date is required.</small> }
                    </div>

                    <div className="p-field">
                        <label htmlFor="end_date">End Date</label>

                        <Calendar id="end_date" name="end_date" showIcon showButtonBar value={ values?.name } onChange={ handleInputChange } className={classNames({ 'p-invalid': submitted && !process?.end_date })} placeholder="Enter the end date ..." required ></Calendar>

                        { submitted && !process?.end_date && <small style={{ color: '#ef9a9a' }} className="p-invalid">End date is required.</small> }
                    </div>

                </div>  
            </>
        );
    }

    const getButtons = () => {

        const next = () => {

            setSubmitted(true);
            console.log(process);

            if (process?.name && process?.description) {
                setIndex(index + 1);
                setSubmitted(false);
            }
        }

        const classBtn = (type) => `p-button-${type} p-px-6`;

        const continueButton = (
            <Button icon="pi pi-arrow-right" onClick={ next }  className={classBtn('info')} iconPos="right" label="Next"/>
        );

        const backButton = (
            <Button  icon="pi pi-arrow-left" onClick={() => setIndex(index + -1)} className={classBtn('danger')} label="Back"/>
        );      

        return (
            <Toolbar className="p-mb-4 p-toolbar" 
                left={ (index > 0 ? backButton : null) }
                right={ (index < 3 ? continueButton : null) }
                style={{ border: '0px' }} />
        );
    }
    
    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Add new process at <i><a>"{model?.name}"</a></i></h2>
            <div className="card">

                <div className="p-md-9" style={{ margin: 'auto' }} >
                    <Steps activeIndex={index} model={wizardItems} readonly={true} />
                </div>

                <div className="card p-shadow-10">
                    { renderSwitch(index) }
                </div>
                
                { getButtons() }

            </div>
        </>
    )
}


export default AddProcess
