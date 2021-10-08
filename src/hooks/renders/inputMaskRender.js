import React from 'react'
import { InputMask } from 'primereact/inputmask';
import { putContainers, putLabel } from './renderFunctions';

const inputMaskRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers } = component;

    let inputMask = (
        <>
            <InputMask
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
                required={ attributes?.required }

                mask={ attributes?.mask }
                autoClear={ attributes?.autoclear }
                unmask={ attributes?.unmask }
                slotChar={ attributes?.slotchar }
                size={ attributes?.size }
                maxlength={ attributes?.maxlength }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </InputMask>
        </>
    )

    if (label) {
        inputMask = putLabel(inputMask, attributes, label);
    }

    if (containers) {
        inputMask = putContainers(inputMask, containers);
    }

    return inputMask;
}

export default inputMaskRender;