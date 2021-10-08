import { SelectButton } from 'primereact/selectbutton';
import React from 'react'
import { putContainers, putLabel } from './renderFunctions';

const selectButtonRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers, options } = component;

    let selectButton = (
        <>
            <SelectButton
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }
                
                multiple={ (attributes?.multiple) ? attributes?.multiple : false  }
                options={ (options?.options) ? options?.options : [] }
                optionLabel={ options?.label }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </SelectButton>
        </>
    )

    if (label) {
        selectButton = putLabel(selectButton, attributes, label);
    }

    if (containers) {
        selectButton = putContainers(selectButton, containers);
    }

    return selectButton;
}

export default selectButtonRender
