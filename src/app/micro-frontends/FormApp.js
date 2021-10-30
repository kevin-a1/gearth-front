import React from "react";
import MicroFrontend from "./MicroFrontend";

const { REACT_APP_FORM_HOST: formHost, } = process.env;

//Component for: Create, Edit and View
export const FormIO = ({ history }) => {
    return (
        <>
            <MicroFrontend history={ history } host={ formHost } name="Form" />
        </>
    );
}