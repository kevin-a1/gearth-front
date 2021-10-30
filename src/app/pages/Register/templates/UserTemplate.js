import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'primereact/toolbar';
import { handleStepsTemplate, leftTemplate, rightTemplate } from './utils/templates';
import { Fieldset } from 'primereact/fieldset';
import { userValidation } from './utils/validations';

const UserTemplate = ({ setIndex, values, handleInputChange }) => {

    const [ errors, setErrors ] = useState({
        username: { error: false, errors: [
            { status: null, msg: 'Is required', },
            { status: null, msg: 'Length > 3 and < 20', },
            { status: null, msg: 'Correct format', },
        ]},
        password: { error: false, errors: [
            { status: null, msg: 'Is required', },
            { status: null, msg: 'Length > 8', },
        ]},
        confirmation: { error: false, errors: [
            { status: null, msg: 'Is required', },
            { status: null, msg: 'Equals password', },
        ]},
    })

    const inputUsername = {
        attributes: {
            name: 'username',
            placeholder: 'Write a username',
            desc: 'Username',
            maxlength: 20,
        },
    };

    const inputPassword = {
        attributes: {
            name: 'password',
            placeholder: 'Write a password',
            desc: 'Password',
            maxlength: 50,
            autocomplete: 'new-password',
            type: 'password',
        },
    };

    const inputConfirmation = {
        attributes: {
            name: 'confirmation',
            placeholder: 'Repeat your password',
            desc: 'Confirm Password',
            maxlength: 50,
            autocomplete: 'new-password',
            type: 'password',
        },
    };

    const handleContinue = () => {

        const { response, data } = userValidation(values);

        if (response) setIndex(i => i + 1);
        else setErrors(data);
    }

    return (
        <>
            <div className="p-grid center p-mb-1">
                <div className="p-col-12 p-lg-5 p-md-6">
                    <div className="">
                        <Fieldset legend="User Info" toggleable>
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputUsername, errors?.username) }
                                right={ rightTemplate('user', inputUsername, errors?.username) } />
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputPassword, errors?.password) }
                                right={ rightTemplate('lock', inputPassword, errors?.password) } />
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputConfirmation, errors?.confirmation) }
                                right={ rightTemplate('lock', inputConfirmation, errors?.confirmation) } />
                        </Fieldset>
                    </div>
                </div>
            </div>

            { handleStepsTemplate(() => { setIndex(i => i - 1) }, handleContinue) }
        </>
    )
}

UserTemplate.propTypes = {
    setIndex: PropTypes.func,
    values: PropTypes.object,
    handleInputChange: PropTypes.func,
}

export default UserTemplate
