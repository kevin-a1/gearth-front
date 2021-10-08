import React from 'react'
import { RadioButton } from 'primereact/radiobutton';
import { putContainers } from './renderFunctions';

const radioButtonRender = ({ component, values, handleInputChange }) => {

    const { attributes, containers, options } = component;

    const getOptionTemplate = (option) => {

        let radioOption = (
            <div key={ `${Math.random()}-div` } className="p-field-radiobutton">

                <RadioButton
                    key={ option?.id }
                    id={ option?.id }
                    name={ attributes?.name }
                    value={ option?.value }
                    className={ option?.class }
                    checked={ ((values) ? values[`${attributes?.name}`] : undefined) === option?.value }
                    readOnly={ option?.readonly }
                    disabled={ option?.disabled }
                    autoFocus={ option?.autofocus }
                    required={ attributes?.required }

                    onChange={ (values && handleInputChange) ? handleInputChange : undefined } >

                </RadioButton>

                <label htmlFor={ option?.id }>{ option?.label?.label }</label>

            </div>
        )

        if (option?.containers) {
            radioOption = putContainers(radioOption, option?.containers);
        }

        return radioOption;
    }

    if (options) {
        let radioButton = (
            <>
                {
                    options.map((o) => {
                        return getOptionTemplate(o)
                    })
                }
            </>
        );

        if (containers) {
            radioButton = putContainers(radioButton, containers);
        }
    
        return radioButton;
    }
}

export default radioButtonRender
