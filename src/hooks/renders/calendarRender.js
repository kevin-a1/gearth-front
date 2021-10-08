import { Calendar } from 'primereact/calendar';
import React from 'react'
import { putContainers, putLabel } from './renderFunctions';

const calendarRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers } = component;

    let calendar = (
        <>
            <Calendar
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                placeholder={ (!label?.float) ? attributes?.placeholder : undefined }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                type={ attributes?.type }
                pattern={ attributes?.pattern }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                showIcon
                showButtonBar

                onChange={ (values && handleInputChange) ? handleInputChange : undefined }
            ></Calendar>
        </>
    )

    if (label) {
        calendar = putLabel(calendar, attributes, label);
    }

    if (containers) {
        calendar = putContainers(calendar, containers);
    }

    return calendar;
}

export default calendarRender
