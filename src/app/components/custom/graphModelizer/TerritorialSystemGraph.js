// React import
import React, {useState} from "react";
// Redux imports
import { useSelector } from 'react-redux'
// Template UI imports
// import {Dropdown} from "primereact/dropdown"; // Uncomment when filter option need it
// Custom UI imports
import VisGraph from "../../VisGraph";
// Actions and store imports
// import * as cypherQueries from '../../../constants/cypher-queries'
// import * as modelActions from '../../../../redux/actions/model.actions';
// Helper classes
import GraphGenerator from "./graph/GraphGenerator";

// IMPORTANT. For now I keep the data need it for filtering by querying, but once this functionality has it own place here
// I have to delete unused elements.
const TerritorialSystemGraph = (props) => {
    const model = useSelector((state) => state.ReducerModel);
    const generator = new GraphGenerator([...model.selectedSubsystems]);
    // VisGraph needs these two components by separate
    const graph = generator.graph;
    const options = generator.options;

    // FOR WHEN SORT BY QUERY DROPDOWN IS ENABLED
    // const [ sortKey, setSortKey ] = useState(["All", "All"]);
    // const [ cypher_query, setCypherQuery ] = useState(cypherQueries.get_all_model_data(model.id, model.userId))
    // const sortOptions = [
    //     { label: "All" , value: ["All", "All"]},
    //     { label: "Strong" , value: ["intensity", "Strong"] },
    //     { label: "Medium" , value: ["intensity", "Medium"] },
    //     { label: "Weak" , value: ["intensity", "Weak"] },
    //     { label: "Key", value: ["key", "true"] },
    // ];
    // const onSortChange = async (event) => {
    //     const value = event.value;
    //     await modelActions.getModelByFilter(model.id, model.userId, value[0], value[1])
    //     setCypherQuery(value)
    //     setSortKey(value)
    // };

    return (
        <div >
            <h5>{props.title}</h5>
            {/*FOR FILTERING INFO*/}
            {/*<div className="p-grid p-nogutter" style={{ marginBottom: "16px", padding: "8px"}}>*/}
            {/*    <div className="p-col-4" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', width: "50%"}}>*/}
            {/*        <i style={{ fontSize: '1.7rem' }} className="pi pi-filter p-mr-3"/>*/}
            {/*        <Dropdown id="d" style={{ width: "100%" }} name={sortOptions.label} value={sortKey}*/}
            {/*                  options={sortOptions} optionLabel="label" placeholder="Filters" onChange={onSortChange}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <VisGraph graph={graph} options={options}/>
        </div>
    )
}

export default TerritorialSystemGraph;



