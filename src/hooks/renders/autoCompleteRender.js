import { AutoComplete } from 'primereact/autocomplete';
import React from 'react'
import { putContainers, putLabel } from './renderFunctions';

const autoCompleteRender = ({ component }) => {

    const { attributes, label, containers } = component;

    let autoComplete = (
        <>
            <AutoComplete
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                placeholder={ (!label?.float) ? attributes?.placeholder : undefined }
                value={ attributes?.value }
                type={ attributes?.type }
                pattern={ attributes?.pattern }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                dropdown
                multiple={ attributes?.multiple }
            ></AutoComplete>
        </>
    )

    if (label) {
        autoComplete = putLabel(autoComplete, attributes, label);
    }

    if (containers) {
        autoComplete = putContainers(autoComplete, containers);
    }

    return autoComplete;
}

export default autoCompleteRender
