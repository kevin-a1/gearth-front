import { EMAIL_REGEX, NAMES_REGEX, DESC_REGEX, PASSWORD_REGEX, PHONE_REGEX, USERNAME_REGEX } from "../../../utils/values/regex";

export const personValidation = (values) => {

    const data = {};

    const { response: idResponse, errors: idErrors } = idValidation(values.id);
    const { response: namesResponse, errors: namesErrors } = namesValidation(values.names);
    const { response: emailResponse, errors: emailErrors } = emailValidation(values.email);
    const { response: phoneResponse, errors: phoneErrors } = phoneValidation(values.phone);
    const { response: lnamesResponse, errors: lnamesErrors } = lnamesValidation(values.lnames);
    const { response: genderResponse, errors: genderErrors } = genderValidation(values.gender);

    data.id = {
        error: idResponse,
        errors: idErrors,
    };

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

export const teamValidation = (values) => {

    const data = {};

    const { response: teamResponse, errors: teamErrors } = teamNameValidation(values.team);
    const { response: descResponse, errors: descErrors } = teamDescValidation(values.desc);

    data.team = {
        error: teamResponse,
        errors: teamErrors,
    };

    data.desc = {
        error: descResponse,
        errors: descErrors,
    };

    if (teamResponse || descResponse) {
        return { response: false, data: data };
    } else {
        return { response: true, data: data };
    }
}

//FIELDS VALIDATIONS

const idValidation = (id) => {

    const errors = [];
    let response = false; //True if have errors
    
    if (id) {
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

const namesValidation = (names) => {

    const errors = [];
    let response = false; //True if have errors
    
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

    if (email.length > 3 && email.length < 320) {
        errors.push({
            status: true,
            msg: 'Length > 3 and < 320',
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

    if (username.match(USERNAME_REGEX)) {
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

    if (password.match(PASSWORD_REGEX)) {
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

    if (confirmation && confirmation === password) {
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

const teamNameValidation = (name) => {

    const errors = [];
    let response = false; //If have errors
    
    if (name) {
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

    if (name.length > 3 && name.length < 200) {
        errors.push({
            status: true,
            msg: 'Length > 3 and < 200',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Length > 3 and < 200',
        });
    }

    if (name.match(NAMES_REGEX)) {
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

const teamDescValidation = (desc) => {

    const errors = [];
    let response = false; //If have errors
    
    if (desc) {
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

    if (desc.length > 5 && desc.length < 500) {
        errors.push({
            status: true,
            msg: 'Length > 5 and < 500',
        });
    } else {
        response = true;
        errors.push({
            status: false,
            msg: 'Length > 5 and < 500',
        });
    }

    if (desc.match(DESC_REGEX)) {
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