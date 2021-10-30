import { Button } from 'primereact/button';
import { confirmPopup } from 'primereact/confirmpopup';
import { RadioButton } from 'primereact/radiobutton'
import { Toolbar } from 'primereact/toolbar';
import inputTextareaRender from '../../../../../hooks/renders/inputTextareaRender';
import inputTextRender from '../../../../../hooks/renders/inputTextRender';

export const leftTemplate = (values, handleInputChange, component, err, area=false) => {

    //Global Changes
    if (component.attributes.required == null) component.attributes.required = true;
    if (component.attributes.autocomplete == null) component.attributes.autocomplete = 'off';
    if (component.attributes.class == null) component.attributes.class = `input-register ${(err?.error) && 'p-invalid'}`;
    else component.attributes.class = `input-register ${(err?.error) && 'p-invalid'} ${component.attributes.class}`;
    
    const { attributes } = component;

    return (
        <>
            <div>
                {   (area) ?
                    inputTextareaRender({ component, values, handleInputChange })
                    :
                    inputTextRender({ component, values, handleInputChange }) 
                }

                <i className="p-d-block p-mt-1">
                    { attributes?.desc }
                    {(attributes?.required) && <span className="p-ml-1 required-input">*</span>}
                </i>
            </div>
        </>
    );
}

export const leftTemplateTeam = (values, handleInputChange, component, err, handleCheckTeam) => {

    //Global Changes
    if (component.attributes.required == null) component.attributes.required = true;
    if (component.attributes.autocomplete == null) component.attributes.autocomplete = 'off';
    if (component.attributes.class == null) component.attributes.class = `input-register ${(err?.error) && 'p-invalid'}`;
    else component.attributes.class = `input-register ${(err?.error) && 'p-invalid'} ${component.attributes.class}`;
    
    const { attributes } = component;

    return (
        <>
            <div>
                <div className="p-inputgroup">
                    { inputTextRender({ component, values, handleInputChange }) }
                    <Button onClick={ handleCheckTeam } icon="pi pi-check" title="Check availability" />
                </div>

                <i className="p-d-block p-mt-1">
                    { attributes?.desc }
                    {(attributes?.required) && <span className="p-ml-1 required-input">*</span>}
                </i>
            </div>
        </>
    );
}

export const rightTemplate = (icon, component, err) => {

    const { attributes } = component;
    let btnStatus = (err?.error) && 'p-button-danger';

    const getIcon = (errStatus) => {
        if (errStatus == null) return 'circle-off color-primary';
        else if (errStatus) return 'check color-success';
        else return 'times color-danger';
    }

    const msg = (
        <>
            <h6><a>{attributes?.desc}</a></h6>
            {
                err?.errors.map((e) => (
                    <div key={e?.msg + attributes?.desc + 'container'} className="p-d-block">
                        <i 
                            key={e?.msg + attributes?.desc + 'icon'}
                            className={`p-mr-1 error-msg pi pi-${getIcon(e?.status)}`}></i>
                        <i 
                            key={e?.msg + attributes?.desc + 'msg'}
                            className="error-msg">{ e?.msg }</i>
                    </div>
                ))
            }
        </>
    );

    const showPopup = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: msg,
            icon: `pi pi-${icon}`,
            footer: <></>,
        });
    };

    return (
        <>
            <Button 
                className={`p-button-rounded p-button-outlined ${btnStatus}`} 
                icon={`pi pi-${icon}`}
                onClick={ showPopup }
                title="Click me!" >
                
                { (!icon) && '⚤' }

            </Button>
        </>
    );
}

//CUSTOM GENDER TEMPLATE

export const genderTemplate = (values, handleInputChange) => {
    return (
        <>
            <div>
                <div className="p-grid">
                    <div className="p-col-12 p-md-4 p-my-0 p-pb-0">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option1" name="gender" value="M" checked={values['gender'] === 'M'} onChange={ handleInputChange } />
                            <label htmlFor="option1">Male</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-4 p-my-0 p-pb-0">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option2" name="gender" value="F" checked={values['gender'] === 'F'} onChange={ handleInputChange } />
                            <label htmlFor="option2">Female</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-4 p-my-0 p-pb-0">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option3" name="gender" value="O" checked={values['gender'] === 'O'} onChange={ handleInputChange } />
                            <label htmlFor="option3">Other</label>
                        </div>
                    </div>
                </div>
                <i className="p-d-block p-mt-1">Gender<span className="p-ml-1 required-input">*</span></i>
            </div>
        </>
    );
}

//BUTTONS BOTTON ACTIONS

export const handleStepsTemplate = (handleBack, handleContinue, finish=false) => {

    return (
        <div className="p-col-12 p-lg-10 p-pb-3" style={{ margin: 'auto', padding: '0px' }}>
            <Toolbar
                className="p-p-2 p-p-lg-3 bg-dark"
                left={
                    <Button
                        style={{ width: '150px' }}
                        className="p-button-danger p-mr-1"
                        label="Back"
                        icon="pi pi-arrow-left"
                        onClick={ handleBack } />
                }                    
                right={
                    <Button
                        type="submit"
                        style={{ width: '150px' }}
                        className={`p-button-${(finish) ? 'info' : 'success'}`}
                        label={`${(finish) ? 'Finish' : 'Continue'}`}
                        icon="pi pi-check"
                        onClick={ handleContinue } /> 
                }/>
        </div>
    );
}