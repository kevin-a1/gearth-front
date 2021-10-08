//General template
export const bodyTemplate = (data, props) => {
    return (
        <>
            <span className="p-column-title">{props.header}</span>
            {data[props.field]}
        </>
    );
};

export const idBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">ID</span>
            {rowData.id}
        </>
    );
}

export const nameBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Name</span>
            {rowData.name}
        </>
    );
}

export const statusBodyTemplate = (rowData) => {

    const valueStatus = (status) => (
        (status === 1) ? 'Active':'Inactive'
    );

    return (
        <>
            <span className="p-column-title">Status</span>
            <span className={`product-badge status-${(rowData.status === 1) ? 'instock' : 'outofstock'}`}>{ valueStatus(rowData.status) }</span>
        </>
    );
}