import React from 'react'
import { Chips } from 'primereact/chips';
import { putContainers, putLabel } from './renderFunctions';

const chipsRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers } = component;

    let chips = (
        <>
            <Chips
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                placeholder={ (!label?.float) ? attributes?.placeholder : undefined }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                type={ attributes?.type }
                pattern={ attributes?.pattern }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autofocus={ attributes?.autofocus }
                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >
                
            </Chips>
        </>
    )

    if (label) {
        chips = putLabel(chips, attributes, label);
    }

    if (containers) {
        chips = putContainers(chips, containers);
    }

    return chips;
}

export default chipsRender
