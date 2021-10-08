import React from 'react' 
import { Knob } from 'primereact/knob';
import { putContainers, putLabel } from './renderFunctions';

const knobRender = ({ component, values, setValues  }) => {

    const { attributes, label, containers } = component;

    let knob = (
        <>
            <Knob
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }
                valueTemplate={"{value}%"}
                step={ attributes?.step }
                min={ attributes?.min }
                max={ attributes?.max }
                
                onChange={ (values && setValues) ? (e) => {
                    setValues({
                        ...values,
                        [ attributes?.name ]: e.value
                    })
                } : undefined } >

            </Knob>
        </>
    )

    if (label) {
        knob = putLabel(knob, attributes, label);
    }

    if (containers) {
        knob = putContainers(knob, containers);
    }

    return knob;
}

export default knobRender
