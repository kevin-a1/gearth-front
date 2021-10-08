import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const EditFieldDialog = ({ field_name, field, data, setData }) => {

    const [displayBasic, setDisplayBasic] = useState(false);
    const [field_data, setField_data] = useState(field)

    const basicDialogFooter = <div>
        <Button type="button" label="Save" onClick={() => setDisplayBasic(false)} icon="pi pi-save" className="p-button-success" />
        <Button type="button" label="Cancel" onClick={() => setDisplayBasic(false)} icon="pi pi-times" className="p-button-danger" />
    </div>;

    const handleInputChange = ({ target }) => {
        setField_data(
            target.value
        );
    }

    return (
        <>
            <Button 
                onClick={ () => setDisplayBasic(true) } 
                className="p-button-rounded p-button-text" 
                icon="pi pi-pencil" />
            
            <Dialog header={ `Edit ${field_name}` } visible={displayBasic} style={{ width: '340px' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                <div class="p-col-12 p-md-0">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <input onChange={ handleInputChange } style={{ width: 'max-content' }} placeholder={ `Enter your ${ field_name }` } class="p-inputtext p-component" value={ field_data } />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

EditFieldDialog.propTypes = {
    field_name: PropTypes.string,
    field: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
}

export default EditFieldDialog
