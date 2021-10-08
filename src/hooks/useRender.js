import autoCompleteRender from './renders/autoCompleteRender';
import buttonRender from './renders/buttonRender';
import calendarRender from './renders/calendarRender';
import checkboxRender from './renders/checkboxRender';
import chipsRender from './renders/chipsRender';
import colorPickerRender from './renders/colorPickerRender';
import containerRender from './renders/containerRender';
import dataTableRender from './renders/dataTableRender';
import dropdownRender from './renders/dropdownRender';
import inputMaskRender from './renders/inputMaskRender';
import inputNumberRender from './renders/inputNumberRender';
import inputSwitchRender from './renders/inputSwitchRender';
import inputTextareaRender from './renders/inputTextareaRender';
import inputTextRender from './renders/inputTextRender';
import knobRender from './renders/knobRender';
import listBoxRender from './renders/listBoxRender';
import multiSelectRender from './renders/multiSelectRender';
import radioButtonRender from './renders/radioButtonRender';
import ratingRender from './renders/ratingRender';
import selectButtonRender from './renders/selectButtonRender';
import sliderRender from './renders/sliderRender';
import toggleButtonRender from './renders/toggleButtonRender';
import textRender from './renders/textRender';
import useForm from './useForm';

const useRender = (component, data = {}) => {
    
    const { values, setValues, handleInputChange } = useForm(data);

    if (component) {

        return {
            template: renderComponent(component, values, setValues, handleInputChange),
            data: values,
        }
        
    } else {
        return null;
    }
}

export const renderComponent = (component, values, setValues, handleInputChange) => {

    const _component = findComponent(component);

    if ( _component ) {

        const { render } = _component;
        return render({ component, values, setValues, handleInputChange });

    } else {
        return null;
    }
}

const components = [
    {
        component: 'inputtext',
        render: inputTextRender,
    },
    {
        component: 'button',
        render: buttonRender,
    },
    {
        component: 'inputtextarea',
        render: inputTextareaRender,
    },
    {
        component: 'autocomplete',
        render: autoCompleteRender,
    },
    {
        component: 'calendar',
        render: calendarRender,
    },
    {
        component: 'inputnumber',
        render: inputNumberRender,
    },
    {
        component: 'chips',
        render: chipsRender,
    },
    {
        component: 'slider',
        render: sliderRender,
    },
    {
        component: 'rating',
        render: ratingRender,
    },
    {
        component: 'colorpicker',
        render: colorPickerRender,
    },
    {
        component: 'knob',
        render: knobRender,
    },
    {
        component: 'container',
        render: containerRender,
    },
    {
        component: 'radiobutton',
        render: radioButtonRender,
    },
    {
        component: 'checkbox',
        render: checkboxRender,
    },
    {
        component: 'inputswitch',
        render: inputSwitchRender,
    },
    {
        component: 'listbox',
        render: listBoxRender
    },
    {
        component: 'dropdown',
        render: dropdownRender,
    },
    {
        component: 'multiselect',
        render: multiSelectRender,
    },
    {
        component: 'togglebutton',
        render: toggleButtonRender,
    },
    {
        component: 'selectbutton',
        render: selectButtonRender,
    },
    {
        component: 'inputmask',
        render: inputMaskRender,
    },
    {
        component: 'datatable',
        render: dataTableRender,
    },
    {
        component: 'text',
        render: textRender,
    }
];

const findComponent = (component) => {
    for (let c of components) {
        if (component?.component) {
            if (c.component === component?.component) {
                return c;
            }
        }
    }
}

export default useRender