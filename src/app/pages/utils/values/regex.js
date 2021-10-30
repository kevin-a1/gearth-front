export const NAMES_REGEX = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{1,1000}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //Email format
export const PHONE_REGEX = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/; //Only alphanumeric
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/
export const DESC_REGEX = '^(.|\s)*[a-zA-Z]+(.|\s)*$';