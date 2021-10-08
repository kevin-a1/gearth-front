import React from 'react';
import { InputText } from 'primereact/inputtext';
import { putContainers, putLabelAndIcon } from './renderFunctions';

const inputTextRender = ({ component, values, handleInputChange }) => {

    const { attributes, icon, label, containers } = component;

    let inputText = (
        <>
            <InputText
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                style={ attributes?.style }
                placeholder={ (!label?.float) ? attributes?.placeholder : undefined }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                type={ attributes?.type }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }
                autoComplete={ attributes?.autocomplete }
                
                required={ attributes?.required }
                minLength={ attributes?.minlength }
                maxLength={ attributes?.maxlength }
                max={ attributes?.max }
                min={ attributes?.min }
                pattern={ attributes?.pattern }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </InputText>
        </>
    )

    if (icon || label) {
        inputText = putLabelAndIcon(inputText, attributes, label, icon);
    }

    if (containers) {
        inputText = putContainers(inputText, containers);
    }

    return inputText;
}

export default inputTextRender;
