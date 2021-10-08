import React, {useEffect, useState, useRef} from "react";

import Graph from 'react-graph-vis';


import '../../../node_modules/vis-network/dist/dist/vis-network.min.css'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
}

const VisGraph = (props) => {
    const { height, width } = useWindowDimensions();
    // Here I can interact with the nodes and edges selected: GEARTH 4.10
    const events = {
        select: ({nodes, edges}) => {
            console.log("Selected nodes:");
            console.log(nodes);
            console.log("Selected edges:");
            console.log(edges);
        },
    };

    return (
        <div style={{width: "100%", height: `${height - 160}px`, background: "white", padding: 20}}>
            <Graph
                graph={props.graph}
                options={props.options}
                // events={events} // uncomment if it is need it to interact the UI
                getNetwork={network => {
                    //  if you want access to vis.js network api you can set the state in a parent component using this property*/}
                }}
            />
        </div>
    )
}

export default VisGraph;
