import { ToggleButton } from 'primereact/togglebutton';
import React from 'react'
import { putContainers, putLabel } from './renderFunctions';

const toggleButtonRender = ({ component, values, handleInputChange }) => {
    
    const { attributes, label, icon, containers } = component;

    let toggleButton = (
        <>
            <ToggleButton
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }

                onLabel={ attributes?.onlabel }
                offLabel={ attributes?.offLabel }
                onIcon={ icon?.on }
                offIcon={ icon?.off }
                iconPos={ icon?.position }
                checked={ (values) ? values[`${attributes?.name}`] : false }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </ToggleButton>
        </>
    )

    if (label) {
        toggleButton = putLabel(toggleButton, attributes, label);
    }

    if (containers) {
        toggleButton = putContainers(toggleButton, containers);
    }

    return toggleButton;
}

export default toggleButtonRender;