import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { putContainers, putLabel } from './renderFunctions';

const inputNumberRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers } = component;

    let inputNumber = (
        <>
            <InputNumber
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                placeholder={ (!label?.float) ? attributes?.placeholder : undefined }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                type={ attributes?.type }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }
                showButtons
                mode={ attributes?.mode }

                max={ attributes?.max }
                min={ attributes?.min }
                required={ attributes?.required }

                onValueChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </InputNumber>
        </>
    )

    if (label) {
        inputNumber = putLabel(inputNumber, attributes, label);
    }

    if (containers) {
        inputNumber = putContainers(inputNumber, containers);
    }

    return inputNumber;
}

export default inputNumberRender;
