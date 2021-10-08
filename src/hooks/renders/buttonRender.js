import React from 'react';
import { Button } from 'primereact/button';
import { putContainers } from './renderFunctions';

const buttonRender = ({ component, values }) => {

    const { attributes, containers, icon } = !!component && component;

    let button = (
        <>
            <Button
                key={ attributes?.id }
                id={ attributes?.id }
                label={ attributes?.label }
                className={ attributes?.class }
                style={ attributes?.style }
                icon={ icon?.icon }
                iconPos={ icon?.position }

                onClick={ () => { console.log(values); } }
            >
            </Button>
        </>
    )

    if (containers) {
        button = putContainers(button, containers, attributes);
    }

    return button;
}

export default buttonRender
