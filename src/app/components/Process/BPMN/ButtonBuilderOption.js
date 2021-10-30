import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';

const ButtonBuilderOption = ({ btnType='primary', label, callback, img }) => {
    return (
        <div className="p-d-inline p-m-1">
            <Button
                className={`p-button-${ btnType }`}
                iconPos="bottom" label={ label }
                onClick={ callback }>
                <img className="p-button-icon p-pt-1" src={ img } style={{ width: '50px' }} />
            </Button>
        </div>
    )
}

ButtonBuilderOption.propTypes = {
    callback: PropTypes.func,
    label: PropTypes.string,
}

export default ButtonBuilderOption
