import React, { useEffect, useState } from 'react';
import PlanTemplate from './templates/PlanTemplate';
import PersonTemplate from './templates/PersonTemplate';
import UserTemplate from './templates/UserTemplate';
import logo from '../../assets/img/gearth-logo.png';
import useForm from '../../../hooks/useForm';
import { Steps } from 'primereact/steps';
import '../../assets/scss/register.scss';
import { changeLayoutCSS, changeThemeCSS } from '../utils/helpers/changeStyleSheetsColor';
import TeamTemplate from './templates/TeamTemplate';

const Register = () => {

    const [ index, setIndex ] = useState(0);
    const { values, setValues, handleInputChange } = useForm({
        id: '',
        names: '',
        lnames: '',
        email: '',
        phone: '',
        gender: '',
        username: '',
        password: '',
        confirmation: '',
        team: '',
        desc: '',
        plan: 1,
        rol: 1,
    });

    // const { values, setValues, handleInputChange } = useForm({
    //     plan: '',
    //     id: '1111111111',
    //     names: 'Gabriela Andreina',
    //     lnames: 'Álvarez',
    //     email: 'gaby@gmail.com',
    //     phone: '9999999999',
    //     gender: 'F',
    //     username: 'Gaby',
    //     password: 'gaby1234567890',
    //     confirmation: 'gaby1234567890',
    //     team: 'Test',
    //     desc: 'Test team for testing',
    // });

    useEffect(() => {
        changeLayoutCSS('dark');
        changeThemeCSS('dark');
    }, [])

    const wizardItems = [
        { label: "Choose a Plan" },
        { label: 'Personal Info' },
        { label: 'User Info' },
        { label: 'Team Info' },
    ];

    const templateSwitch  = () => {
        switch(index) {
            case 0:
                return <PlanTemplate setIndex={ setIndex } values={ values } setValues={ setValues } />;
            case 1:
                return <PersonTemplate setIndex={ setIndex } values={ values } handleInputChange={ handleInputChange } />;
            case 2:
                return <UserTemplate setIndex={ setIndex } values={ values } handleInputChange={ handleInputChange } />;
            case 3:
                return <TeamTemplate setIndex={ setIndex } values={ values } handleInputChange={ handleInputChange } />;
            default:
                return <PlanTemplate setIndex={ setIndex } values={ values } setValues={ setValues } />;
        }
    }

    return (
        <div className="p-grid p-dir-col" style={{ padding: '0px', margin: '0px' }}>

            <div className="p-col p-d-flex" style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <button className="logo p-link p-my-2">
                    <img src={ logo } style={{ width: '5rem', height: 'auto' }}  alt="gearth-logo" />
                </button>
                <h1 className="p-d-inline-block p-ml-3">
                    <a>Sign In</a>
                </h1>
            </div>

            <div className="p-col-12 p-col-md-10 p-col-lg-8" style={{ margin: 'auto' }} >
                <Steps activeIndex={ index } model={ wizardItems } readOnly/>
            </div>

            <div className="p-col" style={{ padding: '0px', margin: '0px' }}>

                <div className="login-body" >
                    <div className="login-wrapper" style={{ backgroundColor: '#3E4754', height: 'auto' }}>

                        <div style={{ width: '90%' }} >
                            { templateSwitch() }
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register