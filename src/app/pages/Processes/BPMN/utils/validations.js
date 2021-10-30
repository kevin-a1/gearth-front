export const validateActivity = (values) => {

    if (values?.desc) {
        return true;
    }

    if (values?.lgDesc) {
        return true;
    }

    if (values?.duration) {
        return true;
    }

    return false;
}