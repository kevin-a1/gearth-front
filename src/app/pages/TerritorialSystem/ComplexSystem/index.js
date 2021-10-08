import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';
import { findAllSubsystems } from '../../../../api/data';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';

const ComplexSystem = () => {

    const [ models, setModels ] = useState(null); //Data od table
    const [ modelsFilters, setModelsFilters ] = useState(null) //Data of table search filter
    const [ expandedRows, setExpandedRows ] = useState([]);
    const [ expandedSubRows, setExpandedSubRows ] = useState([]);
    const [ dropdownValue, setDropdownValue ] = useState(null); //Value of serach filter
    const [ selectedAutoValue, setSelectedAutoValue ] = useState(null);
    const [ autoFilteredValue, setAutoFilteredValue ] = useState([]);
    const [ autoValue, setAutoValue ] = useState(null);

    const  toast  = useRef(null);
    const history = useHistory();

    useEffect(() => {
          setModels(findAllSubsystems());
          setModelsFilters(findAllSubsystems());
    }, []);

    useEffect(() => {

        if (dropdownValue) {

            console.log(modelsFilters);

            if (dropdownValue == 'm') {

                let data = []

                for (const model of modelsFilters) {
                    data.push({
                        name: model.name,
                        id: model.id,
                    });
                }
                setAutoValue( data );

            } else if (dropdownValue == 'p') {

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

            } else if (dropdownValue == 'a') {

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
        setModels(findAllSubsystems());
        setModelsFilters(models);
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

        let data = []
        let rowData = {}
        let rowSubData = {}
        
        for (const model of models) {
            if (model?.processes) {
                for (const process of model?.processes) {
                    if (process?.activities) {
                        for (const activity of process?.activities) {
                            if (selectedAutoValue) {
                                for (const value of selectedAutoValue) {

                                    if (model?.name == value?.name) {
                                        rowData[model?.id] = true;
                                        if (!data.includes(model)) data.push(model);
                                    }
                                    
                                    if (process?.name == value?.name || activity?.name == value?.name) {
                                        rowData[model?.id] = true;
                                        rowSubData[process?.id] = true;
                                        if (!data.includes(model)) data.push(model);
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
        else setModels(findAllSubsystems());
    }

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
                        <Button className="p-mr-1 p-button-info" icon="pi pi-plus" label="Expandir Todo" onClick={ expandAll } />
                        <Button className="p-mr-1 p-button-warning" icon="pi pi-minus" label="Colapsar Todo" onClick={ collapseAll } />
                    </div>
                }
                right={
                    <div className="table-header-container p-d-block">
                        <Dropdown 
                            className="p-mr-1" style={{ width: '115px' }} value={ dropdownValue } 
                            onChange={(e) => setDropdownValue(e.value)} options={ dropdownValues } 
                            optionLabel="name" placeholder="Buscar por:" />

                        <AutoComplete 
                            className="p-mr-1" multiple placeholder="Buscar" id="dd" 
                            dropdown value={ selectedAutoValue } 
                            onChange={(e) => setSelectedAutoValue(e.value)}
                            suggestions={ autoFilteredValue } completeMethod={ searchCountry } field="name" />

                        <Button className="p-button-rounded" icon="pi pi-refresh" label="Refrescar" onClick={ reloadData } />
                    </div>
                } />
        </>
    );

    const imageBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`${data.img}`} alt={data.img} className="product-image" />
                <div>
                    <Rating value={data.qualification} readonly cancel={false} />
                </div>
            </>
        );
    };

    const nameBodyTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                <h4>{data.name}</h4>
                {/*<span style={{ color: '#00acee' }}>#{data?.hashtag}</span>*/}
            </>
        );
    };

    const modelButtonsTemplate = (data) => {

        const handleButton = () => {
            history.push({
                pathname: '/admin/add-processes',
                state: {
                    model: data, 
                },
            });
        }

        return (
            <>
                <Button onClick={ handleButton } icon="pi pi-plus" className="p-button-success p-button-rounded" label="Nuevo Subsistema" />
            </>
        );
    }

    const processButtonsTemplate = (data) => {

        const handleButton = () => {

            history.push({
                pathname: '/admin/add-activity',
                state: {
                    process: data,
                    action: (data?.activities?.length > 0) ? 'edit' : 'new',
                },
            });
        }

        const handleViewButton = () => {
            history.push({
                pathname: '/admin/view-activity',
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
                    title={ (data?.activities?.length > 0) ? 'Editar Subsistema' : 'Nuevo Subsistema NIvel 2' } />
            </div>
        );
    }

    const activityButtonsTemplate = (data) => {

        const handleButton = () => {
            history.push({
                pathname: '/admin/build-form',
                state: {
                    process: data,
                },
            });
        }

        const handleViewButton = () => {
            history.push({
                pathname: '/admin/render-form-schema',
                state: {
                    activity: data,
                },
            });
        }

        return (
            <div style={{ textAlign: 'center' }}>
                {
                    (data?.schema) &&
                        <Button 
                            onClick={ handleViewButton } icon="pi pi-eye" 
                            className="p-button-info p-button-rounded p-mx-1" 
                            title="View Form" />
                }
                <Button 
                    onClick={ handleButton } icon={ `pi pi-${ (data?.schema) ? 'pencil' : 'plus' }` } 
                    className={ `p-button-rounded p-button-${ (data?.schema) ? 'warning' : 'success' }` }
                    title={ (data?.activities?.length > 0) ? 'Edit Form' : 'New Form' } />
            </div>
        );
    }

    const rowSubExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Activities for <a>{data?.name}</a></h5>
                <DataTable value={data?.activities} >
                    <Column field="name" header="Nombre" sortable body={bodyTemplate}></Column>
                    <Column field="description" header="Descripción" sortable body={bodyTemplate}></Column>
                    <Column style={{ width: '10rem' }} field="status" header="Estado" sortable body={ statusBodyTemplate }></Column>
                    <Column style={{ width: '15rem' }} body={ activityButtonsTemplate }></Column>
                </DataTable>
            </div>
        );
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable" >
                <h5>Subsistemas nivel 2 de: <a>{ data?.name }</a></h5>
                <DataTable value={ data?.processes } expandedRows={ expandedSubRows } className="p-datatable-customers" dataKey="id" onRowToggle={(e) => setExpandedSubRows(e.data)} rowExpansionTemplate={ rowSubExpansionTemplate }>
                    <Column expander headerStyle={{ width: '3rem' }} />
                    <Column field="name" header="Nombre" sortable body={bodyTemplate}></Column>
                    <Column field="description" header="Descripción" sortable body={bodyTemplate}></Column>
                    <Column style={{ width: '10rem' }} field="status" header="Estado" sortable body={statusBodyTemplate}></Column>
                    <Column style={{ width: '15rem' }} body={ processButtonsTemplate }></Column>
                </DataTable>
            </div>
        );
    };

    return (
        <div className="p-grid table-demo">

            <div className="p-col-12">
                <div className="card">
                    <a><h2 style={{ textAlign: 'center' }}>Sistemas complejos</h2></a>
                    <Toast ref={ toast } />
                    <DataTable value={ models } expandedRows={ expandedRows } className="p-datatable-customers" dataKey="id" onRowToggle={(e) => setExpandedRows(e.data)} onRowExpand={ onRowExpand } onRowCollapse={ onRowCollapse }
                        header={ modelsTableHeader } rowExpansionTemplate={ rowExpansionTemplate }>
                        <Column expander headerStyle={{ width: '3rem' }} />
               
                        <Column field="name" header="Nombre" body={ nameBodyTemplate }></Column>
                        <Column field="desc_small" header="Descripción" body={ bodyTemplate }></Column>
                        <Column style={{ width: '10rem' }} field="status" header="Estado" sortable body={ statusBodyTemplate }></Column>
                        <Column style={{ width: '15rem' }} body={ modelButtonsTemplate }></Column>
                    </DataTable>
                </div>
            </div>

        </div>
    )
}

export default ComplexSystem
