import { ColorPicker } from 'primereact/colorpicker';
import React from 'react'
import { putContainers, putLabel } from './renderFunctions';

const colorPickerRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers } = component;

    let colorPicker = (
        <>
            <ColorPicker
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }
                defaultColor={ attributes?.defaultcolor }
                tooltip={ attributes.tooltip } 
                
                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </ColorPicker>
        </>
    )

    if (label) {
        colorPicker = putLabel(colorPicker, attributes, label);
    }

    if (containers) {
        colorPicker = putContainers(colorPicker, containers);
    }

    return colorPicker;
}

export default colorPickerRender
