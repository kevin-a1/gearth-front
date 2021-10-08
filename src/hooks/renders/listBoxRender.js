import { ListBox } from 'primereact/listbox';
import React from 'react'
import { putContainers, putLabel } from './renderFunctions';

const listBoxRender = ({ component, values, handleInputChange }) => {

    const { attributes, label, containers, options } = component;

    let listBox = (
        <>
            <ListBox
                key={ attributes?.id }
                id={ attributes?.id }
                name={ attributes?.name }
                className={ attributes?.class }
                value={ (values) ? values[`${attributes?.name}`] : undefined }
                readOnly={ attributes?.readonly }
                disabled={ attributes?.disabled }
                autoFocus={ attributes?.autofocus }
                options={ (options?.options) ? options?.options : [] }
                optionLabel={ options?.label }
                filter={ (attributes?.filter) ? attributes?.filter : true }

                onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

            </ListBox>
        </>
    )

    if (label) {
        listBox = putLabel(listBox, attributes, label);
    }

    if (containers) {
        listBox = putContainers(listBox, containers);
    }

    return listBox;
}

export default listBoxRender
