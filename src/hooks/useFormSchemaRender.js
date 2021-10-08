import React from 'react'

const useFormSchemaRender = (formSchema) => {

    //Schema is required
    if (!formSchema) {
        return undefined;
    }

    let { components, id } = formSchema;

    if (components) {
        components = getComponents(components);
    }

    return {
        component: 'container',
        attributes: {
            id: (id) ? id : 'form',
            class: 'card p-shadow-10'
        },
        contents: components,
    };
}

const getComponents = (components) => {

    const componentsRenders = []

    for (const component of components) {

        if (component?.type == 'select') {
            componentsRenders.push(getDropdown(component));
        } else if (component?.type == 'button') {
            componentsRenders.push(getButton(component));
        } else if (component?.type == 'text') {
            componentsRenders.push(getText(component));
        } else if (component?.type == 'textfield') {
            componentsRenders.push(getInputText(component));
        } else if (component?.type == 'number') {
            componentsRenders.push(getInputNumber(component));
        } else if (component?.type == 'radio') {
            componentsRenders.push(getRadioButton(component));
        } else if (component?.type == 'checkbox') {
            componentsRenders.push(getCheckBox(component));
        }
    }

    return componentsRenders;
}

//GET methods of components

const getDropdown = (component) => {

    const options = [];
    let count = 1;

    for (const value of component?.values) {
        options.push({
            id: count,
            label: value?.label,
            value: value?.value,
        });
        count++;
    }

    return {
        component: 'dropdown',
        attributes: {
            id: component?.id,
            name: component?.key,
        },
        options: {
            options: options,
            label: 'label',
        },
        label: {
            label: component?.description,
            float: true,
            class: '',
        },
        containers: ['p-my-2 p-py-2', 'p-field', 'p-fluid']
    }
}

const getButton = (component) => {
    
    return {
        component: 'button',
        attributes: {
            id: component?.id,
            class: 'p-button-rounded p-button-success',
            label: component?.label,
            style: {
                textAlign: 'center',
            }
        },
        action: component?.action,
    };
}

const getText = (component) => {

    let count = 0;
    let text = component?.text;

    if (text) {
        for (const letter of component?.text) {
            if (letter == '#' ) {
                count ++;
                text = text.replace('#', '');
            } else break;
        }
    }
        
    return {
        component: 'text',
        type: getTextType(count),
        text: text,
        attributes: {
            id: component?.id,
            class: 'p-p-1',
            style: {
                textAlign: 'center',
            }
        },
    };
}

const getInputText = (component) => {
    
    return {
        component: 'inputtext',
        attributes: {
            id: component?.id,
            class: '',
            name: component?.key,
            type: 'text',
            placeholder: component?.description,
            required: component?.validate?.required,
            minlength: component?.validate?.minLength,
            maxlength: component?.validate?.maxLength,
            pattern: component?.validate?.regularExpressionPattern,
        },
        label: {
            label: component?.label,
            float: true,
            class: '',
        },
        containers: ['p-my-2 p-py-2', 'p-field', 'p-fluid']
    }
}

const getInputNumber = (component) => {
    
    return {
        component: 'inputnumber',
        attributes: {
            id: component?.id,
            class: '',
            name: component?.key,
            placeholder: component?.description,
            required: component?.validate?.required,
            min: component?.validate?.min,
            max: component?.validate?.max,
        },
        label: {
            label: component?.label,
            float: true,
            class: '',
        },
        containers: ['p-my-2 p-py-2', 'p-field', 'p-fluid'],
    }
}

const getCheckBox = (component) => {

    return {
        component: 'checkbox',
        attributes: {
            id: component?.id,
            key: component?.id,
            name: component?.key,
        },
        options: [
            {
                id: component?.id,
                value: component?.label,
                label: {
                    label: component?.label,
                    class: '',
                },
                containers: ['p-col'],
            },
        ],
        containers: ['p-grid'],
    }
}

const getRadioButton = (component) => {

    const options = [];
    let count = 1;

    for (const value of component?.values) {
        options.push({
            id: `${count}`,
            key: `${count}`,
            value: value?.value,
            label: {
                label: value?.label,
                class: '',
            },
            containers: ['p-col'],
        });
        count++;
    }

    return {
        component: 'radiobutton',
        attributes: {
            id: component?.id,
            key: component?.id,
            name: component?.key,
            required: component?.validate?.required,
        },
        options: options,
        containers: ['p-grid'],
    }
}

//Helpers

const getTextType = (count) => {
    if (count == 1) return 'h2';
    else if (count == 2) return 'h3';
    else if (count == 3) return 'h4';
    else if (count == 4) return 'h5';
    else if (count == 5) return 'h6';
    else return 'p';
}

export default useFormSchemaRender;
