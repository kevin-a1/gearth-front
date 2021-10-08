import React from 'react'
import { DataTable } from 'primereact/datatable';
import { putContainers, putLabel } from './renderFunctions';

const dataTableRender = ({ component, values, setValues, handleInputChange }) => {

    const { attributes, label, containers } = component;

    let dataTable = (
        <>
            <DataTable
                key={ attributes?.id }
                id={ attributes?.id }
                className={ attributes?.class }
                value={ (attributes?.values) ? attributes?.values : [] }
                
                paginator={ attributes?.paginator } >

            </DataTable>
        </>
    )

    if (label) {
        dataTable = putLabel(dataTable, attributes, label);
    }

    if (containers) {
        dataTable = putContainers(dataTable, containers);
    }

    return dataTable;
}

export default dataTableRender