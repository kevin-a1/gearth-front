import React from 'react'
import { Slider } from 'primereact/slider';
import { putContainers, putLabel } from './renderFunctions';

const sliderRender = ({ component, values, setValues }) => {

    const { attributes, label, containers } = component;

    let slider = (
        <>
            <Slider
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }

                onChange={ (values && setValues) ? (e) => {
                    setValues({
                        ...values,
                        [ attributes?.name ]: e.value
                    })
                } : undefined } >

            </Slider>
        </>
    )

    if (label) {
        slider = putLabel(slider, attributes, label);
    }

    if (containers) {
        slider = putContainers(slider, containers);
    }

    return slider;
}

export default sliderRender
