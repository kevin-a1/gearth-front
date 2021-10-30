import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';
import { findAllMoments } from '../../../api/data';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { bodyTemplate, statusBodyTemplate } from '../utils/templates/tableTemplates';
import defaultImg from '../../assets/flechas.png';
import { getMomentsModelByModelId } from '../../../redux/actions/moments-model.actions';
import { useSelector } from 'react-redux';

const Processes = () => {

    const [ models, setModels ] = useState(null); //Data od table
    const [ modelsFilters, setModelsFilters ] = useState(null) //Data of table search filter
    const [ expandedRows, setExpandedRows ] = useState([]);
    const [ expandedSubRows, setExpandedSubRows ] = useState([]);
    const [ dropdownValue, setDropdownValue ] = useState(null); //Value of serach filter
    const [ selectedAutoValue, setSelectedAutoValue ] = useState(null);
    const [ autoFilteredValue, setAutoFilteredValue ] = useState([]);
    const [ autoValue, setAutoValue ] = useState(null);

    const user = useSelector((state) => state.LoginState.data);
    const toast  = useRef(null);
    const history = useHistory();

    const loadData = async() => {
        setModels( await getMomentsModelByModelId(194, user?.access_token) );
        setModelsFilters( await getMomentsModelByModelId(194, user?.access_token) );
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {

        if (dropdownValue) {

            if (dropdownValue === 'm') {

                let data = []

                for (const model of modelsFilters) {
                    data.push({
                        name: model.name,
                        id: model.id,
                    });
                }
                setAutoValue( data );

            } else if (dropdownValue === 'p') {

                let data = []

                for (const model of modelsFilters) {
                    if (model?.processes) {
                        for (const process of model?.processes) {
                            data.push({
                                name: process.name,
                                id: process.id,
                            });
                        }
                    }
                }
                setAutoValue( data );

            } else if (dropdownValue === 'a') {

                let data = []

                for (const model of modelsFilters) {
                    if (model?.processes) {
                        for (const process of model?.processes) {
                            if (process?.activities) {
                                for (const activity of process?.activities) {
                                    data.push({
                                        name: activity.name,
                                        id: activity.id,
                                    });
                                }
                            }
                        }
                    }
                }
                setAutoValue( data );
            }
        } else {
            if (modelsFilters) {
                let data = []
                
                for (const model of modelsFilters) {
                    data.push({
                        name: model.name,
                        id: model.id,
                    });
                }
                setAutoValue( data );
            }
        }

    }, [ dropdownValue, modelsFilters ])

    useEffect(() => {
        if (selectedAutoValue) {
            setTableByFilters();
        }
    }, [ selectedAutoValue ])

    const reloadData = (event) => {
        loadData();
        toast.current.show({ severity: 'info', summary: 'Data Reloaded Successfully', life: 3000 });
    }

    const searchCountry = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValue([...autoValue]);
            }
            else {
                setAutoFilteredValue(autoValue.filter((country) => {
                    return country.name.toLowerCase().includes(event.query.toLowerCase());
                }));
            }
        }, 100);
    };

    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };

    const expandAll = () => {
        let _expandedRows = {}
        models.forEach(m => _expandedRows[`${m.id}`] = true);

        setExpandedRows(_expandedRows);
        toast.current.show({ severity: 'success', summary: 'All Rows Expanded', life: 3000 });
    };

    const collapseAll = () => {
        setExpandedRows(null);
        toast.current.show({ severity: 'success', summary: 'All Rows Collapsed', life: 3000 });
    };

    const setTableByFilters = () => {

        const data = []
        const rowData = {}
        const rowSubData = {}

        for (const model of modelsFilters) { //Search By Models

            if (selectedAutoValue) {
                for (const value of selectedAutoValue) {

                    if (model?.name === value?.name) {
                        rowData[model?.id] = true;
                        data.push(model);
                    }
                }
            }

            if (model?.processes) {
                for (const process of model?.processes) { //Search By Process

                    if (selectedAutoValue) {
                        for (const value of selectedAutoValue) {
                            
                            if (process?.name === value?.name) {
                                rowData[model?.id] = true;
                                rowSubData[process?.id] = true;
                                data.push(model);
                            }
                        }
                    }

                    if (process?.activities) {
                        for (const activity of process?.activities) { //Search By Activities

                            if (selectedAutoValue) {
                                for (const value of selectedAutoValue) {
                                    
                                    if (activity?.name === value?.name) {
                                        rowData[model?.id] = true;
                                        rowSubData[process?.id] = true;
                                        data.push(model);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        setExpandedSubRows(rowSubData);
        setExpandedRows(rowData);
        if (data.length > 0) setModels(data);
        else setModels(findAllMoments());
    }

    const dropdownValues = [
        { name: 'Model', value: 'm', },
        { name: 'Process', value: 'p', },
        { name: 'Activity', value: 'a', },
    ];

    const modelsTableHeader = (
        <>
            <Toolbar
                className="p-p-0 p-m-0"
                style={{
                    border: '0px'
                }}
                left={
                    <div className="table-header-container p-d-block">
                        <Button className="p-mr-1 p-button-info" icon="pi pi-plus" label="Expand All" onClick={ expandAll } />
                        <Button className="p-mr-1 p-button-warning" icon="pi pi-minus" label="Collapse All" onClick={ collapseAll } />
                    </div>
                }
                right={
                    <div className="table-header-container p-d-block">
                        <Dropdown 
                            className="p-mr-1" style={{ width: '115px' }} value={ dropdownValue } 
                            onChange={(e) => setDropdownValue(e.value)} options={ dropdownValues } 
                            optionLabel="name" placeholder="Search By:" />

                        <AutoComplete 
                            className="p-mr-1" multiple placeholder="Search" id="dd" 
                            dropdown value={ selectedAutoValue } 
                            onChange={(e) => setSelectedAutoValue(e.value)}
                            suggestions={ autoFilteredValue } completeMethod={ searchCountry } field="name" />

                        <Button className="p-button-rounded" icon="pi pi-refresh" label="Refresh" onClick={ reloadData } />
                    </div>
                } />
        </>
    );

    const nameBodyTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                <h4>{data?.name}</h4>
            </>
        );
    };

    const descBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Description</span>
                <p style={{ textAlign: 'justify', fontSize: '.99rem' }}>{data?.description}</p>
            </>
        );
    };

    const modelButtonsTemplate = (data) => {

        const handleButton = () => {
            history.push({
                pathname: '/admin/add-process',
                state: {
                    model: data, 
                },
            });
        }

        return (
            <>
                <Button onClick={ handleButton } icon="pi pi-plus" className="p-button-success p-button-rounded" label="Process" />
            </>
        );
    }

    const processButtonsTemplate = (data) => {

        const handleButton = () => {

            history.push({
                pathname: '/bpmn/builder',
                state: {
                    process: data,
                    action: (data?.activities?.length > 0) ? 'edit' : 'new',
                },
            });
        }

        const handleViewButton = () => {
            history.push({
                pathname: '/bpmn/viewer',
                state: {
                    process: data,
                },
            });
        }

        return (
            <div style={{ textAlign: 'center' }}>
                {
                    (data?.activities?.length > 0) &&
                        <Button 
                            onClick={ handleViewButton } icon="pi pi-eye" 
                            className="p-button-info p-button-rounded p-mx-1" 
                            title="View Process" />
                }
                <Button 
                    onClick={ handleButton } icon={ `pi pi-${ (data?.activities?.length > 0) ? 'pencil' : 'plus' }` } 
                    className={ `p-button-rounded p-button-${ (data?.activities?.length > 0) ? 'warning' : 'success' }` }
                    title={ (data?.activities?.length > 0) ? 'Edit Process' : 'New Process' } />
            </div>
        );
    }

    const activityButtonsTemplate = (data) => {

        const handleButton = () => {
            history.push({
                pathname: '/form/builder',
                state: {
                    process: data,
                },
            });
        }

        const handleViewButton = () => {
            history.push({
                pathname: '/form/viewer',
                state: {
                    activity: data,
                    token: user?.access_token,
                },
            });
        }

        return (
            <div style={{ textAlign: 'center' }}>
                {
                    (data?.type) &&
                        <Button 
                            onClick={ handleViewButton } icon="pi pi-eye" 
                            className="p-button-info p-button-rounded p-mx-1" 
                            title="View Form" />
                }
                <Button 
                    onClick={ handleButton } icon={ `pi pi-${ (data?.type) ? 'pencil' : 'plus' }` } 
                    className={ `p-button-rounded p-button-${ (data?.type) ? 'warning' : 'success' }` }
                    title={ (data?.activities?.length > 0) ? 'Edit Form' : 'New Form' } />
            </div>
        );
    }

    const rowSubExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Activities for <a>{data?.name}</a></h5>
                <DataTable value={data?.activities} >
                    <Column field="name" header="Name" sortable body={bodyTemplate}></Column>
                    <Column field="description" header="Description" sortable body={bodyTemplate}></Column>
                    <Column style={{ width: '10rem' }} field="status" header="Status" sortable body={ statusBodyTemplate }></Column>
                    <Column style={{ width: '15rem' }} body={ activityButtonsTemplate }></Column>
                </DataTable>
            </div>
        );
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable" >
                <h5>Processes for <a>{ data?.name }</a></h5>
                <DataTable value={ data?.processes } expandedRows={ expandedSubRows } className="p-datatable-customers" dataKey="id" onRowToggle={(e) => setExpandedSubRows(e.data)} rowExpansionTemplate={ rowSubExpansionTemplate }>
                    <Column expander headerStyle={{ width: '3rem' }} />
                    <Column field="name" header="Name" sortable body={ bodyTemplate }></Column>
                    <Column field="description" header="Description" sortable body={ bodyTemplate }></Column>
                    <Column style={{ width: '10rem' }} field="status" header="Status" sortable body={ statusBodyTemplate }></Column>
                    <Column style={{ width: '15rem' }} body={ processButtonsTemplate }></Column>
                </DataTable>
            </div>
        );
    };

    return (
        <div className="p-grid table-demo">

            <div className="p-col-12">
                <div className="card">
                    <a><h2 style={{ textAlign: 'center' }}>Processes</h2></a>
                    <Toast ref={ toast } />
                    <DataTable value={ models } expandedRows={ expandedRows } className="p-datatable-customers" dataKey="id" onRowToggle={(e) => setExpandedRows(e.data)} onRowExpand={ onRowExpand } onRowCollapse={ onRowCollapse }
                        header={ modelsTableHeader } rowExpansionTemplate={ rowExpansionTemplate }>
                        <Column expander headerStyle={{ width: '3rem' }} />
                        <Column style={{ width: '19rem' }} field="name" header="Name" sortable body={ nameBodyTemplate }></Column>
                        <Column field="description" header="Description" sortable body={ descBodyTemplate }></Column>
                        <Column style={{ width: '9rem' }} field="status" header="Status" sortable body={ statusBodyTemplate }></Column>
                        <Column style={{ width: '10rem' }} body={ modelButtonsTemplate }></Column>
                    </DataTable>
                </div>
            </div>

        </div>
    )
}

export default Processes
