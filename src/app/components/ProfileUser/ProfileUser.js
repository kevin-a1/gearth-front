import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Field } from './ProfilePersonal';
import EditFieldDialog from '../EditFieldDialog';

const RedirectField = (route, msg, icon = 'arrow-right') => {

    const history = useHistory();

    const handleRedirectBtn = () => {
        history.push(route);
    }

    return (
        <>
            <button onClick={ handleRedirectBtn } className="p-button p-component p-button-info p-button-text p-mr-2 p-mb-2">
                <span className={ `p-button-icon p-c pi pi-${icon} p-button-icon-right` }></span>
                <span className="p-button-label p-c">{ msg }</span>
            </button>
        </>
    )
}

const ProfileUser = ({ user }) => {

    return (
        <>
            <Toolbar
                className="p-mb-4 p-toolbar"
                left={ Field(user?.username, 'Username') }
                right={ <EditFieldDialog  field_name='Username' field={ user?.username } data={ user } /> } >
            </Toolbar>
            <Toolbar
                className="p-mb-4 p-toolbar"
                left={ Field('k************7', 'Password', 'lock') }
                right={ <EditFieldDialog  field_name='Password' field={ user?.password } data={ user } /> } >
            </Toolbar>
            <Toolbar
                className="p-mb-4 p-toolbar"
                left={ Field(user?.role?.name, 'Role', 'briefcase') }
                right={ <EditFieldDialog  field_name='Role' field={ user?.role?.name } data={ user } /> } >
            </Toolbar>
            <Toolbar
                className="p-mb-4 p-toolbar"
                left={ Field(user?.team?.name, 'Team', 'users')}
                right={ RedirectField('/pages/listmembers', 'View') } >
            </Toolbar>
            {
                (user?.role?.id === 1 || user?.role?.id === 2) &&
                    <Toolbar
                        className="p-mb-4 p-toolbar"
                        left={ Field(user?.team?.plan?.name, 'Subscription Plan', 'dollar') }
                        right={ RedirectField('/pages/changeplan', 'Update') } >
                    </Toolbar>
            }
            {
                (user?.role?.id === 1 || user?.role?.id === 2) &&
                    <Toolbar className="p-mb-4 p-toolbar"
                        left={ Field('PayPal', 'Pay Method', 'id-card') }
                        right={ RedirectField('#', 'View') } >
                    </Toolbar>
            }
        </>
    );
}

ProfileUser.propTypes = {
    user: PropTypes.object.isRequired
}

export default ProfileUser;
