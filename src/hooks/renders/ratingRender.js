import React from 'react'
import { Rating } from 'primereact/rating';
import { putContainers, putLabel } from './renderFunctions';

const ratingRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers } = component;

    let rating = (
        <>
            <Rating
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                style={ attributes?.style }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }
                tooltip={ attributes?.tooltip }
                stars={ attributes?.stars }
                cancel={ attributes?.cancel }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </Rating>
        </>
    )

    if (label) {
        rating = putLabel(rating, attributes, label);
    }

    if (containers) {
        rating = putContainers(rating, containers);
    }

    return rating;
}

export default ratingRender
