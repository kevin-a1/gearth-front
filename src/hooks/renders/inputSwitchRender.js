import React from 'react'
import { InputSwitch } from 'primereact/inputswitch';
import { putContainers, putLabel } from './renderFunctions';

const inputSwitchRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers } = component;

    let inputSwitch = (
        <>
            <InputSwitch
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                checked={ (values) ? values[`${attributes?.name}`] : false }
                type={ attributes?.type }
                pattern={ attributes?.pattern }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </InputSwitch>
        </>
    )

    if (label) {
        inputSwitch = putLabel(inputSwitch, attributes, label);
    }

    if (containers) {
        inputSwitch = putContainers(inputSwitch, containers);
    }

    return inputSwitch;
}

export default inputSwitchRender
