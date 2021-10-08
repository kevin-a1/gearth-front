import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react'
import { putContainers, putLabelAndIcon } from './renderFunctions';

const inputTextareaRender = ({ component, values, handleInputChange }) => {

    const { attributes, icon, label, containers } = component;

    let inputTextarea = (
        <>
            <InputTextarea
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                placeholder={ (!label?.float) ? attributes?.placeholder : undefined }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                type={ attributes?.type }
                pattern={ attributes?.pattern }
                rows={ attributes?.rows }
                cols={ attributes?.cols }
                autoResize={ attributes?.autoresize }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined }
            ></InputTextarea>
        </>
    )

    if (icon || label) {
        inputTextarea = putLabelAndIcon(inputTextarea, attributes, label, icon);
    }

    if (containers) {
        inputTextarea = putContainers(inputTextarea, containers);
    }

    return inputTextarea;
}

export default inputTextareaRender
