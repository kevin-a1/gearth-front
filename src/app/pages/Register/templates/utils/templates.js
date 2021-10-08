import { Button } from 'primereact/button';
import { confirmPopup } from 'primereact/confirmpopup';
import { RadioButton } from 'primereact/radiobutton'
import inputTextRender from '../../../../../hooks/renders/inputTextRender';

export const leftTemplate = (values, handleInputChange, component, err) => {

    //Global Changes
    if (component.attributes.required == null) component.attributes.required = true;
    if (component.attributes.class == null) component.attributes.class = `input-person-register ${(err?.error) && 'p-invalid'}`;
    if (component.attributes.autocomplete == null) component.attributes.autocomplete = 'off';
    
    const { attributes } = component;

    return (
        <>
            <div>
                { inputTextRender({ component, values, handleInputChange }) }
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
    let status = (err?.error) && 'p-button-danger';

    const msg = (
        <>
            <h6><a>{attributes?.desc}</a></h6>
            {
                err?.errors.map((e) => (
                    <div key={e?.msg + attributes?.desc + 'container'} className="p-d-block">
                        <i 
                            key={e?.msg + attributes?.desc + 'icon'}
                            className={`p-mr-1 error-msg pi pi-${(e?.status) ? 'check color-success' : 'times color-danger'}`}></i>
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
                className={`p-button-rounded p-button-text ${status}`} 
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
                            <RadioButton inputId="option1" name="gender" value="m" checked={values['gender'] === 'm'} onChange={ handleInputChange } />
                            <label htmlFor="option1">Male</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-4 p-my-0 p-pb-0">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option2" name="gender" value="f" checked={values['gender'] === 'f'} onChange={ handleInputChange } />
                            <label htmlFor="option2">Female</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-4 p-my-0 p-pb-0">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="option3" name="gender" value="o" checked={values['gender'] === 'o'} onChange={ handleInputChange } />
                            <label htmlFor="option3">Other</label>
                        </div>
                    </div>
                </div>
                <i className="p-d-block p-mt-1">Gender<span className="p-ml-1 required-input">*</span></i>
            </div>
        </>
    );
}