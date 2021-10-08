import React, {useEffect, useRef, useState} from "react";
import {RadioButton} from "primereact/radiobutton";
import {Checkbox} from "primereact/checkbox";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";

import store from "../../../../redux/store";

import * as actionsGraphModelizer from "../../../../redux/actions/graph-modelizer.actions";


const ComponentsFeaturesTable = (props) => {

    const [components, setComponents] = useState(props.data);
    const [globalFilter1, setGlobalFilter1] = useState('');
    const [loading, setLoading] = useState(true);


    const relationshipTableHeader = (
        <div className="table-header">
            {/*List of Customers*/}
            {/*<span className="p-input-icon-left">*/}
            {/*    <i className="pi pi-search" />*/}
            {/*    <InputText value={globalFilter1} onChange={(e) => setGlobalFilter1(e.target.value)} placeholder="Global Search" />*/}
            {/*</span>*/}
        </div>
    );

    useEffect(() => {
        setComponents(props.data)
        setLoading(false)
    }, [components]);

    const componentBodyTemplate = (data, props) => {
        return (
            <div>
                {data.name}
            </div>
        );
    };

    const onChangeTypeValue = (e) => {

        const index = components.findIndex(c => c.id === e.target.id);
        const value = e.target.value;
        const subsystemId = components[index].subsystemId;
        const componentId = components[index].id;
        const newComponent = {...components[index]};
        newComponent.type = value;

        store.dispatch(actionsGraphModelizer.changeComponentAttribute(subsystemId, componentId, newComponent))
        const cmp = [...components]
        cmp[index].type = value;
        setComponents(cmp);
    }


    const typeBodyTemplate = (data) => {
        const id = data.id;

        return (
            <>
                <div className="p-grid" key={1}>
                    <div className="p-col-12 p-md-6">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option1" id={id} name="option" value="variable" checked={data.type === 'variable'} onChange={onChangeTypeValue} />
                            <label htmlFor="option1">Variable</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-6">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option2" id={id} name="option" value="constant" checked={data.type === 'constant'} onChange={onChangeTypeValue} />
                            <label htmlFor="option2">Constante</label>
                        </div>
                    </div>
                </div>
            </>
        );
    };




    const onChangeKeyValue = (e) => {

        const index = components.findIndex(c => c.id === e.target.id);
        const value = e.target.checked.toString();
        const subsystemId = components[index].subsystemId;
        const componentId = components[index].id;
        const newComponent = {...components[index]};
        newComponent.key = value;

        store.dispatch(actionsGraphModelizer.changeComponentAttribute(subsystemId, componentId, newComponent))

        const cmp = [...components]
        cmp[index].key = value;
        setComponents(cmp);
    }

    const keyBodyTemplate = (data) => {
        const id = data.id;
        return (
            <>
                <div>
                    <div className="p-col-12 p-md-4" >
                        <div className="p-field-checkbox">
                            <Checkbox id={id} inputId="checkOption1" name="option" value={data.key === 'true'} checked={data.key === 'true'} onChange={onChangeKeyValue} />
                        </div>
                    </div>
                </div>
            </>
        )
    };

    return (
        <div>
            <DataTable value={components}  className="p-datatable-customers" rows={10} dataKey="id" rowHover
                       globalFilter={globalFilter1} emptyMessage="No se han agregado componentes aún." loading={loading} header={relationshipTableHeader}>
                <Column style={{width: "25%"}} field="name" header="Componente"  body={componentBodyTemplate}/>
                <Column  style={{width: "15%"}} field="type" header="Tipo"  body={typeBodyTemplate}/>
                <Column style={{width: "15%"}} field="key" header="Llave"  body={keyBodyTemplate}/>
            </DataTable>
        </div>
    )
}

export default ComponentsFeaturesTable;
