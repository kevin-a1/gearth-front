export const changeLayoutCSS = (layout) => {
    changeStyleSheetsColor('layout-css', 'layout-' + layout + '.css', 1);
}

export const changeThemeCSS = (theme) => {
    changeStyleSheetsColor('theme-css', 'theme-' + theme + '.css', 1);
}

export const changeStyleSheetsColor = (id, value, from) => {
    const element = document.getElementById(id);
    const urlTokens = element.getAttribute('href').split('/');

    if (from === 1) {           // which function invoked this function - change scheme
        urlTokens[urlTokens.length - 1] = value;
    } else if (from === 2) {       // which function invoked this function - change color
        urlTokens[urlTokens.length - 2] = value;
    }

    const newURL = urlTokens.join('/');

    replaceLink(element, newURL);
};

const replaceLink = (linkElement, href) => {
    if (isIE()) {
        linkElement.setAttribute('href', href);
    } else {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }
};

const isIE = () => {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
};