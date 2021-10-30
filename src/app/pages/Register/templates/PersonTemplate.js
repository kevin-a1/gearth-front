import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'primereact/toolbar';
import { Fieldset } from 'primereact/fieldset';
import { leftTemplate, rightTemplate, genderTemplate, handleStepsTemplate } from './utils/templates';
import { personValidation } from './utils/validations';

const PersonTemplate = ({ setIndex, values, handleInputChange }) => {

    const [ errors, setErrors ] = useState({
        id: { error: false, errors: [
            { status: null, msg: 'Is required', },
        ]},
        names: { error: false, errors: [
            { status: null, msg: 'Is required', },
            { status: null, msg: 'Length > 3 and < 50', },
            { status: null, msg: 'Correct format', },
        ]},
        lnames: { error: false, errors: [
            { status: null, msg: 'Is required', },
            { status: null, msg: 'Length > 3 and < 50', },
            { status: null, msg: 'Correct format', },
        ]},
        email: { error: false, errors: [
            { status: null, msg: 'Is required', },
            { status: null, msg: 'Length > 3 and < 320', },
            { status: null, msg: 'Correct format', },
        ]},
        phone: { error: false, errors: [
            { status: null, msg: 'Length > 10 and < 20', },
            { status: null, msg: 'Correct format', },
        ]},
        gender: { error: false, errors: [
            { status: null, msg: 'Is required', },
        ]}
    })

    const inputID = {
        attributes: {
            name: 'id',
            placeholder: 'Write your identification',
            desc: 'Identification',
            type: 'number',
        },
    };

    const inputNames = {
        attributes: {
            name: 'names',
            placeholder: 'Write your names',
            desc: 'Names',
            maxlength: 50,
        },
    };

    const inputLastNames = {
        attributes: {
            name: 'lnames',
            placeholder: 'Write your last names',
            desc: 'Last Names',
            maxlength: 50,
        },
    };

    const inputEmail = {
        attributes: {
            name: 'email',
            placeholder: 'Write your email',
            desc: 'Email',
            maxlength: 320,
            pattern: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
        },
    };

    const inputPhone = {
        attributes: {
            name: 'phone',
            placeholder: 'Write your phone number',
            desc: 'Phone',
            required: false,
            type: 'number',
        },
    };

    const inputGender = {
        attributes: {
            name: 'phone',
            placeholder: 'Write your phone number',
            desc: 'Phone',
            required: false,
            type: 'number',
        },
    };

    const handleContinue = () => {

        const { response, data } = personValidation(values);

        if (response) setIndex(i => i + 1);
        else setErrors(data);
    }

    return (
        <>
            <div className="p-grid center p-mb-1" >
                <div className="p-col-12 p-lg-5 p-md-6">
                    <div className="">
                        <Fieldset legend="Person Info" toggleable>
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputID, errors?.id) }
                                right={ rightTemplate('id-card', inputID, errors?.id) } />
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputNames, errors?.names) }
                                right={ rightTemplate('user', inputNames, errors?.names) } />
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputLastNames, errors?.lnames) }
                                right={ rightTemplate('user', inputLastNames, errors?.lnames) } />
                        </Fieldset>
                    </div>
                </div>
                <div className="p-col-12 p-lg-5 p-md-6">
                    <div className="">
                        <Fieldset legend="Contact Info" toggleable>
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputEmail, errors?.email) }
                                right={ rightTemplate('envelope', inputEmail, errors?.email) } />
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputPhone, errors?.phone) }
                                right={ rightTemplate('phone', inputPhone, errors?.phone) } />
                            <Toolbar
                                className="p-mb-3"
                                left={ genderTemplate(values, handleInputChange, errors?.gender) }
                                right={ rightTemplate(null, inputGender, errors?.gender) } />
                        </Fieldset>
                    </div>
                </div>
            </div>

            { handleStepsTemplate(() => { setIndex(i => i - 1) }, handleContinue) }
        </>
    )
}

PersonTemplate.propTypes = {
    setIndex: PropTypes.func,
    values: PropTypes.object,
    handleInputChange: PropTypes.func,
}

export default PersonTemplate
