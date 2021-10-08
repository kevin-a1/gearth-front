import React from 'react'
import { putContainers, getTextByType } from './renderFunctions';

const textRender = ({ component }) => {

    const { attributes, containers, type, text:value } = component;

    let text;

    if (attributes) {
        text = getTextByType(attributes, type, value);
    }

    if (containers) {
        text = putContainers(text, containers);
    }

    return text;
}

export default textRender;
