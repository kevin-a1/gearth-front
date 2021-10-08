import React from 'react'
import { Checkbox } from 'primereact/checkbox';
import { putContainers } from './renderFunctions';

const checkboxRender = ({ component, values, setValues }) => {

    const { attributes, containers, options } = component;

    const onCheckboxChange = (e) => {
        const list = (values[`${attributes?.name}`]) ? values[`${attributes?.name}`] : []
        let selectedValue = [...list];
        if (e.checked)
            selectedValue.push(e.value);
        else
            selectedValue.splice(selectedValue.indexOf(e.value), 1);

        setValues({
            ...values,
            [ attributes?.name ]: selectedValue
        });
    };

    const getOptionTemplate = (option) => {

        let checkOption = (
            <div className="p-field-checkbox">
 
                <Checkbox
                    key={ option?.id }
                    id={ option?.id }
                    name={ attributes?.name }
                    value={ option?.value }
                    className={ option?.class }
                    checked={ (values) && 
                                (values[`${attributes?.name}`]) && values[`${attributes?.name}`].indexOf(option?.value) !== -1 }
                    readOnly={ option?.readonly }
                    disabled={ option?.disabled }
                    autoFocus={ option?.autofocus }
                    required={ attributes?.required }

                    onChange={ (values && setValues) ? onCheckboxChange : undefined } >

                </Checkbox>

                <label htmlFor={ option?.id }>{ option?.label?.label }</label>

            </div>
        )

        if (option?.containers) {
            checkOption = putContainers(checkOption, option?.containers);
        }

        return checkOption;
    }

    if (options) {
        let checkbox = (
            <>
                {
                    options.map((o) => {
                        return getOptionTemplate(o)
                    })
                }
            </>
        );

        if (containers) {
            checkbox = putContainers(checkbox, containers);
        }
    
        return checkbox;
    }
}

export default checkboxRender
