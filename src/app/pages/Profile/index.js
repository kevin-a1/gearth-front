import React, { useState } from 'react'
import { useLogin } from '../../../redux/hooks/useUser';
import { Fieldset } from 'primereact/fieldset';
import '../../assets/scss/profile.scss';
import ProfileUser from '../../components/ProfileUser/ProfileUser';
import ProfilePersonal from '../../components/ProfileUser/ProfilePersonal';

const Profile = props => {

    const {data} = useLogin();
    const {person} = data;

    const [user] = useState(data);
    const [persona] = useState(person);
    const photo = "https://www.tuexperto.com/wp-content/uploads/2015/07/perfil_01.jpg";
    return (
        <>
            <div className="center">
                <div className="card p-d-inline-flex rounded p-shadow-20">
                    <input type="image" src={ photo } className="img-profile" alt="profile"/>
                </div>
            </div>
            <div className="card p-grid">
                <div className="title-user">
                    <h2>
                        { `${persona?.names} ${persona?.last_names}` }
                    </h2>
                </div>
                <div className="p-col-12 p-lg-6 p-shadow-5">
                    <div className="card">
                        <h5>Personal Information</h5>
                        <Fieldset legend="Personal Information" toggleable>
                            <ProfilePersonal person={ persona } />
                        </Fieldset>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6 p-shadow-5">
                    <div className="card">
                        <h5>User Data</h5>
                        <Fieldset legend="User Data" toggleable>
                            <ProfileUser user={ user } />
                        </Fieldset>
                    </div>
                </div>
            </div>
        </>
    )
}

Profile.propTypes = {

}

export default Profile
