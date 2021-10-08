import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { leftTemplate, rightTemplate } from './utils/templates';
import { Fieldset } from 'primereact/fieldset';
import { userValidation } from './utils/validations';

const UserTemplate = ({ index, setIndex, values, handleInputChange }) => {

    const [ errors, setErrors ] = useState({
        username: { error: false, errors: [], },
        password: { error: false, errors: [], },
        confirmation: { error: false, errors: [], },
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

        if (response) setIndex(index + 1);
        else setErrors(data);

        console.log(errors);
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
            <div className="p-col-12 p-lg-10 p-pb-3" style={{ margin: 'auto', padding: '0px' }}>
                <Toolbar
                    className="p-p-2 p-p-lg-3 bg-dark"
                    left={
                        <Button
                            style={{ width: '150px' }}
                            className="p-button-danger p-mr-1"
                            label="Back"
                            icon="pi pi-arrow-left"
                            onClick={() => {
                                setIndex(index - 1);
                            }} />
                    }                    
                    right={
                        <Button
                            type="submit"
                            style={{ width: '150px' }}
                            className="p-button-success"
                            label="Continue"
                            icon="pi pi-check"
                            onClick={ handleContinue } /> 
                    }/>
            </div>
        </>
    )
}

UserTemplate.propTypes = {
    index: PropTypes.number,
    setIndex: PropTypes.func,
    values: PropTypes.object,
    handleInputChange: PropTypes.func,
}

export default UserTemplate
