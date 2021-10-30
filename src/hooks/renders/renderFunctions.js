import React from 'react'

export const putContainers = (component, containers) => {
    
    for (const c of containers) {
        component = (
            <div className={ c }>
                { component }
            </div>
        );
    }

    return component;
}

export const putLabelAndIcon = (component, attributes, label, icon) => {

    component = (

        <>
            {
                (!label?.float && label?.label) && 
                    <label htmlFor={ attributes?.id }  className={ label?.class }>{ label?.label }</label>
            }
            {
                (label?.float || !label) &&
                    <i className={ `${icon?.icon} ${icon?.class}` } />
                        
            }
            { 
                component 
            }                
            {
                (label?.float && label?.label) && 
                    <label htmlFor={ attributes?.id } className={ label?.class }>{ label?.label }</label>
            }
        </>
    );

    if (label?.float || !label) {

        let classSpan = `${ (icon?.position) && 'p-input-icon-'+icon?.position } ${(label?.float) && 'p-float-label'}`

        component = (
            <span className={ classSpan }>
                { component }
            </span>
        );
    }

    return component;
}

export const putLabel = (component, attributes, label) => {

    component = (
        <>
            {
                (!label?.float && label?.label) && 
                    <label htmlFor={ attributes?.id } className={ label?.class }>{ label?.label }</label>
            }
            { 
                component 
            }                
            {
                (label?.float && label?.label) && 
                    <label htmlFor={ attributes?.id } className={ label?.class }>{ label?.label }</label>
            }

        </>
    );

    if (label?.float) {

        let classSpan = `${(label?.float) && 'p-float-label'}`

        component = (
            <span className={ classSpan }>
                { component }
            </span>
        );
    }

    return component;
}

export const getTextByType  = (attributes, type, value) => {

    let text;
    
    if (type === 'p') {
        text = (
            <>
                <p
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </p>
            </>
        )
    } else if (type === 'span') {
        text = (
            <>
                <span
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </span>
            </>
        )
    } else if (type === 'i') {
        text = (
            <>
                <i
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </i>
            </>
        )
    } else if (type === 'b') {
        text = (
            <>
                <b
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </b>            
            </>
        )
    } else if (type === 'u') {
        text = (          <>
                <u
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </u>            
            </>
        )
    } else if (type === 'mark') {
        text = (
            <>
                <mark
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </mark>            
            </>
        )
    } else if (type === 'pre') {
        text = (
            <>
                <pre
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </pre>           
            </>
        )
    } else if (type === 'div') {
        text = (
            <>
                <div
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </div>            
            </>
        )
    } else if (type === 'h1') {
        text = (
            <>
                <h1
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </h1>
            </>
        )
    } else if (type === 'h2') {
        text = (
            <>
                <h2
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </h2>
            </>
        )
    } else if (type === 'h3') {
        text = (
            <>
                <h3
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </h3>
            </>
        )
    } else if (type === 'h4') {
        text = (
            <>
                <h4
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </h4>
            </>
        )
    } else if (type === 'h5') {
        text = (
            <>
                <h5
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </h5>
            </>
        )
    } else if (type === 'h6') {
        text = (
            <>
                <h6
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </h6>
            </>
        )
    } else {
        text = (
            <>
                <div
                    id={ attributes?.id }
                    key={ attributes?.key }
                    className={ attributes?.class }
                    style={ attributes?.style } 
                    >
                    { value }
                </div>
            </>
        )
    }
    
    return text;
}