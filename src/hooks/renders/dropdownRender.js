import React from 'react'
import { Dropdown } from 'primereact/dropdown';
import { putContainers, putLabel } from './renderFunctions';

const dropdownRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers, options } = component;

    let inputText = (
        <>
            <Dropdown
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                placeholder={ (!label?.float) ? attributes?.placeholder : undefined }
                type={ attributes?.type }
                pattern={ attributes?.pattern }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }
                options={ (options?.options) ? options?.options : [] }
                optionLabel={ options?.label }
                filter={ (attributes?.filter) ? attributes?.filter : true }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </Dropdown>
        </>
    )

    if (label) {
        inputText = putLabel(inputText, attributes, label);
    }

    if (containers) {
        inputText = putContainers(inputText, containers);
    }

    return inputText;
}

export default dropdownRender
