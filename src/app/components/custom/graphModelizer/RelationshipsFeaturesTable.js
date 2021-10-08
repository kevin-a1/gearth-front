import React, {useEffect, useRef, useState} from "react";
import {RadioButton} from "primereact/radiobutton";
import {Checkbox} from "primereact/checkbox";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";

import store from "../../../../redux/store";
import * as actionsGraphModelizer from "../../../../redux/actions/graph-modelizer.actions";

const RelationshipsFeaturesTable = (props) => {
    const [relationships, setRelationships] = useState(props.data);
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
        setRelationships(props.data)
        setLoading(false)
    }, [relationships]);

    const relationshipBodyTemplate = (data, props) => {
        return (
            <>
                {data.source.name} -> {data.target.name}
            </>
        );
    };

    const onChangeIntensityValue = (e) => {
        const index = parseInt(e.target.id);
        const value = e.target.value;
        const subsystemId = relationships[index].source.subsystemId;
        const componentId = relationships[index].source.id;
        const newRelationship = {...relationships[index].target};
        newRelationship.interaction.intensity = value;

        store.dispatch(actionsGraphModelizer.updateRelationshipFeatures(subsystemId, componentId, newRelationship))

        const aux = [...relationships]
        aux[index].target.interaction.intensity = value;
        setRelationships(aux);
    }


    const intensityBodyTemplate = (data) => {
        const id = data.index.toString()
        return (
            <>
                <div className="p-grid" key={1}>

                    <div className="p-col-12 p-md-4">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option1" id={id} name="option" value="Weak" checked={data.target.interaction.intensity === 'Weak'} onChange={onChangeIntensityValue} />
                            <label htmlFor="option1">Débil</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-4">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option2" id={id} name="option" value="Medium" checked={data.target.interaction.intensity === 'Medium'} onChange={onChangeIntensityValue} />
                            <label htmlFor="option2">Media</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-4">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option3" id={id} name="option" value="Strong" checked={data.target.interaction.intensity === 'Strong'} onChange={onChangeIntensityValue} />
                            <label htmlFor="option3">Fuerte</label>
                        </div>
                    </div>
                </div>
            </>
        );
    };


    const onChangeStateValue = (e) => {
        const index = parseInt(e.target.id);
        const value = e.target.value;
        const subsystemId = relationships[index].source.subsystemId;
        const componentId = relationships[index].source.id;
        const newRelationship = {...relationships[index].target};
        newRelationship.interaction.state = value;

        store.dispatch(actionsGraphModelizer.updateRelationshipFeatures(subsystemId, componentId, newRelationship))

        const aux = [...relationships]
        aux[index].target.interaction.state = value;
        setRelationships(aux);
    }

    const stateBodyTemplate = (data) => {
        const id = data.index.toString()
        return (
            <>
                <div className="p-grid">
                    <div className="p-col-12 p-md-2">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option1" id={id} name="optionState" value="1" checked={data.target.interaction.state.toString() === "1"} onChange={onChangeStateValue} />
                            <label htmlFor="option1">1</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-2">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option2" id={id} name="optionState" value="2" checked={data.target.interaction.state.toString() === "2"} onChange={onChangeStateValue} />
                            <label htmlFor="option2">2</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-2">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option3" id={id} name="optionState" value="3" checked={data.target.interaction.state.toString() === "3"} onChange={onChangeStateValue} />
                            <label htmlFor="option3">3</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-2">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option3" id={id} name="optionState" value="4" checked={data.target.interaction.state.toString() === "4"} onChange={onChangeStateValue} />
                            <label htmlFor="option4">4</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-2">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option3" id={id} name="optionState" value="5" checked={data.target.interaction.state.toString() === "5"} onChange={onChangeStateValue} />
                            <label htmlFor="option5">5</label>
                        </div>
                    </div>
                </div>


            </>
        );
    };

    const onChangeKeyValue = (e) => {

        const index = parseInt(e.target.id);
        const value = e.target.checked.toString();
        const subsystemId = relationships[index].source.subsystemId;
        const componentId = relationships[index].source.id;
        const newRelationship = {...relationships[index].target};
        newRelationship.interaction.key = value;

        store.dispatch(actionsGraphModelizer.updateRelationshipFeatures(subsystemId, componentId, newRelationship))

        const aux = [...relationships]
        aux[index].target.interaction.key = value;
        setRelationships(aux);
    }

    const keyBodyTemplate = (data) => {
        const id = data.index.toString()
        return (
            <>
                <div>
                    <div className="p-col-12 p-md-4" >
                        <div className="p-field-checkbox">
                            <Checkbox id={id} inputId="checkOption1" name="option" value={data.target.interaction.key === 'true'} checked={data.target.interaction.key === 'true'} onChange={onChangeKeyValue} />
                        </div>
                    </div>
                </div>
            </>
        )
    };

    return (
        <div>
            <h5>{props.title}</h5>

            <DataTable value={relationships} paginator className="p-datatable-customers" rows={10} dataKey="id" rowHover
                       globalFilter={globalFilter1} emptyMessage="No relationships found." loading={loading} header={relationshipTableHeader}>
                <Column style={{width: "25%"}} field="name" header="Relationship"  body={relationshipBodyTemplate}/>
                <Column field="state" header="State"  body={stateBodyTemplate}/>
                <Column field="intensity" header="Intensity"  body={intensityBodyTemplate}/>
                <Column style={{width: "10%"}} field="key" header="Key"  body={keyBodyTemplate}/>
            </DataTable>
        </div>
    )
}

export default RelationshipsFeaturesTable;
