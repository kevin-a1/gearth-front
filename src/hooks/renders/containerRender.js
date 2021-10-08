import React from 'react'
import { renderComponent } from '../useRender';

const containerRender = ({ component, values, setValues, handleInputChange }) => {

    const { attributes, contents } = component;

    return (
        <div
            className={ attributes?.class }
            style={ attributes?.style }
            key={ attributes?.id } >

            {
                (contents) ? 

                    contents.map((c) => {
                        return renderComponent(c, values, setValues, handleInputChange)
                    })

                    :

                    undefined
            }
            
        </div>
    )
}

export default containerRender
