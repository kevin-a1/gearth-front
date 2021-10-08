const NAMES_REGEX = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{1,50}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
const USERN_REGEX = /^[a-zA-Z0-9]+$/;

export const personValidation = (values) => {

    const data = {};

    const { response: namesResponse, errors: namesErrors } = namesValidation(values.names);
    const { response: emailResponse, errors: emailErrors } = emailValidation(values.email);
    const { response: phoneResponse, errors: phoneErrors } = phoneValidation(values.phone);
    const { response: lnamesResponse, errors: lnamesErrors } = lnamesValidation(values.lnames);
    const { response: genderResponse, errors: genderErrors } = genderValidation(values.gender);

    data.names = {
        error: namesResponse,
        errors: namesErrors,
    };

    data.lnames = {
        error: lnamesResponse,
        errors: lnamesErrors,
    };

    data.email = {
        error: emailResponse,
        errors: emailErrors,
    };

    data.phone = {
        error: phoneResponse,
        errors: phoneErrors,
    };

    data.gender = {
        error: genderResponse,
        errors: genderErrors,
    };

    if (namesResponse || lnamesResponse || emailResponse || genderResponse || phoneResponse) {
        return { response: false, data: data };
    } else {
        return { response: true, data: data };
    }
}

export const userValidation = (values) => {

    const data = {};

    const { response: usernameResponse, errors: usernameErrors } = usernameValidation(values.username);
    const { response: passwordResponse, errors: passwordErrors } = passwordValidation(values.password);
    const { response: confirmationResponse, errors: confirmationErrors } = confirmationValidation(values.confirmation, values.password);

    data.username = {
        error: usernameResponse,
        errors: usernameErrors,
    };

    data.password = {
        error: passwordResponse,
        errors: passwordErrors,
    };

    data.confirmation = {
        error: confirmationResponse,
        errors: confirmationErrors,
    };

    if (usernameResponse || passwordResponse || confirmationResponse) {
        return { response: false, data: data };
    } else {
        return { response: true, data: data };
    }
}

//FIELDS VALIDATIONS

const namesValidation = (names) => {

    const errors = [];
    let response = false; //If have errors
    
    if (names) {
        errors.push({
            status: true,
            msg: 'Is required',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Is required',
        });
    }

    if (names.length > 3 && names.length < 50) {
        errors.push({
            status: true,
            msg: 'Length > 3 and < 50',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Length > 3 and < 50',
        });
    }

    if (names.match(NAMES_REGEX)) {
        errors.push({
            status: true,
            msg: 'Correct format',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Correct format',
        });
    }

    return {
        errors,
        response,
    };
}

const lnamesValidation = (lnames) => {

    const errors = [];
    let response = false; //If have errors
    
    if (lnames) {
        errors.push({
            status: true,
            msg: 'Is required',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Is required',
        });
    }

    if (lnames.length > 3 && lnames.length < 50) {
        errors.push({
            status: true,
            msg: 'Length > 3 and < 50',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Length > 3 and < 50',
        });
    }

    if (lnames.match(NAMES_REGEX)) {
        errors.push({
            status: true,
            msg: 'Correct format',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Correct format',
        });
    }

    return {
        errors,
        response,
    };
}

const emailValidation = (email) => {

    const errors = [];
    let response = false; //If have errors
    
    if (email) {
        errors.push({
            status: true,
            msg: 'Is required',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Is required',
        });
    }

    if (email.length < 60) {
        errors.push({
            status: true,
            msg: 'Length < 60',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Length < 60',
        });
    }

    if (email.match(EMAIL_REGEX)) {
        errors.push({
            status: true,
            msg: 'Correct format',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Correct format',
        });
    }

    return {
        errors,
        response,
    };
}

const phoneValidation = (phone) => {

    const errors = [];
    let response = false; //If have errors

    if (phone.length > 9 && phone.length < 50) {
        errors.push({
            status: true,
            msg: 'Length > 10 and < 20',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Length > 10 and < 20',
        });
    }

    if (phone.match(PHONE_REGEX)) {
        errors.push({
            status: true,
            msg: 'Correct format',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Correct format',
        });
    }

    return {
        errors,
        response,
    };
}

const genderValidation = (gender) => {

    const errors = [];
    let response = false; //If have errors
    
    if (gender) {
        errors.push({
            status: true,
            msg: 'Is required',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Is required',
        });
    }

    return {
        errors,
        response,
    };
}

const usernameValidation = (username) => {

    const errors = [];
    let response = false; //If have errors
    
    if (username) {
        errors.push({
            status: true,
            msg: 'Is required',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Is required',
        });
    }

    if (username.length > 3 && username.length < 20) {
        errors.push({
            status: true,
            msg: 'Length > 3 and < 20',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Length > 3 and < 20',
        });
    }

    if (username.match(USERN_REGEX)) {
        errors.push({
            status: true,
            msg: 'Correct format',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Correct format',
        });
    }

    return {
        errors,
        response,
    };
}

const passwordValidation = (password) => {

    const errors = [];
    let response = false; //If have errors
    
    if (password) {
        errors.push({
            status: true,
            msg: 'Is required',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Is required',
        });
    }

    if (password.length > 8) {
        errors.push({
            status: true,
            msg: 'Length > 8',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Length > 8',
        });
    }

    return {
        errors,
        response,
    };
}

const confirmationValidation = (confirmation, password) => {

    const errors = [];
    let response = false; //If have errors
    
    if (confirmation) {
        errors.push({
            status: true,
            msg: 'Is required',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Is required',
        });
    }

    if (confirmation && confirmation == password) {
        errors.push({
            status: true,
            msg: 'Equals password',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Equals password',
        });
    }

    return {
        errors,
        response,
    };
}