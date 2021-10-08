import React from "react";

const Spinner = (props) => {

    return (
        <div style={{width: "100%"}}>
            <div style={{width: 145, margin: "0 auto"}}>
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '10rem', color: "#777BF1"}}/>
            </div>

        </div>
    );
}

export default Spinner;
