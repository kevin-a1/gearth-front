import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'primereact/toolbar';
import EditFieldDialog from '../EditFieldDialog';

export const Field = (field, field_name, icon = 'user', gender = null) => {

    const getIconGender = (g) => {
        return (g === 'M') ? <i className={`pi p-mr-3`}>♂</i> : <i className={`pi p-mr-3`}>♀</i>
    };

    return (
        <>
            <div>
                <h5>
                    { (gender) ? getIconGender(gender) : <i className={`pi pi-${icon} p-mr-3`}></i> }
                    { field }
                </h5>
                <i>{ field_name }</i>
            </div>
        </>
    );
}

const ProfilePersonal = ({ person }) => {

    return (
        <>
            <Toolbar
                id={ person?.names }
                className="p-mb-4 p-toolbar"
                left={ Field(person?.names, 'Names') }
                right={ <EditFieldDialog  field_name='Name' field={ person?.names } data={ person } /> } >
            </Toolbar>

            <Toolbar
                className="p-mb-4 p-toolbar"
                left={ Field(person?.last_names, 'Last Names') }
                right={ <EditFieldDialog  field_name='Last Name' field={ person?.last_names } data={ person } /> } >
            </Toolbar>

            <Toolbar
                className="p-mb-4 p-toolbar"
                left={ Field(person?.email, 'Email', 'envelope') }
                right={ <EditFieldDialog  field_name='Email' field={ person?.email } data={ person } /> } >
            </Toolbar>

            <Toolbar
                className="p-mb-4 p-toolbar"
                left={ Field(person?.gender, 'Gender', '', person?.gender) }
                right={ <EditFieldDialog  field_name='Gender' field={ person?.gender } data={ person } /> } >
            </Toolbar>

            <Toolbar
                className="p-mb-4 p-toolbar"
                left={ Field(person?.identification, 'Identification', 'id-card') }
                right={ <EditFieldDialog  field_name='Identification' field={ person?.identification } data={ person } /> } >
            </Toolbar>
        </>
    );
}

ProfilePersonal.propTypes = {
    person: PropTypes.object.isRequired
};

export default ProfilePersonal;
