import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { handleStepsTemplate, leftTemplate, leftTemplateTeam, rightTemplate } from './utils/templates'
import { Fieldset } from 'primereact/fieldset'
import { Toolbar } from 'primereact/toolbar'
import { teamValidation } from './utils/validations'
import { checkTeamAvailability } from '../../../../redux/actions/team.actions'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { registrarUsuario } from '../../../../redux/actions/user.action'

const TeamTemplate = ({ setIndex, values, handleInputChange }) => {

    const user = useSelector((state) => state.LoginState.data);
    const history = useHistory();

    const [ errors, setErrors ] = useState({
        team: { error: false, errors: [
            { status: null, msg: 'Is required', },
            { status: null, msg: 'Unique name', },
            { status: null, msg: 'Length > 3 and < 30', },
            { status: null, msg: 'Correct format', },
        ]},
        desc: { error: false, errors: [
            { status: null, msg: 'Is required', },
            { status: null, msg: 'Length > 5 and < 300', },
            { status: null, msg: 'Correct format', },
        ]},
    })

    const inputTeam = {
        attributes: {
            name: 'team',
            placeholder: 'Write a team name',
            desc: 'Team name',
            maxlength: 30,
        },
    };

    const inputDesc = {
        attributes: {
            name: 'desc',
            placeholder: 'Write a team description',
            desc: 'Description',
            maxlength: 300,
            class: 'p-pb-2 p-mt-1',
            rows: 6,
        },
    };

    const handleCheckTeam = async() => {

        let { data } = teamValidation(values); //Get validation errors
        let { team } = data;
        let { error, errors: teamErrors } = team;
        let { available } = await checkTeamAvailability(values?.team, user?.access_token); //Check if was available

        if (!error && available) error = false;
        else error = true; //True if have errors

        data = { 
            desc: errors?.desc, 
            team: { 
                error: error, 
                errors: [
                    ...teamErrors,
                    { status: available, msg: 'Unique name' },
                ]
            }
        };

        setErrors(data);
    }

    const handleContinue = async () => {

        let { response, data } = teamValidation(values); //Get validation errors
        let { team, desc } = data;
        let { error, errors: teamErrors } = team;
        let { available } = await checkTeamAvailability(values?.team, user?.access_token); //Check if was available

        if (!error && available) error = false;
        else error = true; //True if have errors

        if (response && !error) response = true; //True if all was correct
        else response = false;

        data = {
            desc, 
            team: { 
                error: error, 
                errors: [
                    ...teamErrors,
                    { status: available, msg: 'Unique name' },
                ]
            }
        };

        if (response) {

            const userRegistered = await registrarUsuario(values);
            console.log(userRegistered);

            if (userRegistered) {
                history.push('/login');
            }

        } else {
            setErrors(data);
        }
    }

    return (
        <>
            <div className="p-grid center p-mb-1">
                <div className="p-col-12 p-lg-5 p-md-6">
                    <div className="">
                        <Fieldset legend="Team Info" toggleable>
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplateTeam(values, handleInputChange, inputTeam, errors?.team, handleCheckTeam) }
                                right={ rightTemplate('users', inputTeam, errors?.team) } />
                            <Toolbar
                                className="p-mb-3"
                                left={ leftTemplate(values, handleInputChange, inputDesc, errors?.desc, true) }
                                right={ rightTemplate('bars', inputDesc, errors?.desc) } />
                        </Fieldset>
                    </div>
                </div>
            </div>
            { handleStepsTemplate(() => setIndex(i => i - 1), handleContinue, true) }
        </>
    )
}

TeamTemplate.propTypes = {
    setIndex: PropTypes.func,
    values: PropTypes.object,
    handleInputChange: PropTypes.func,
}

export default TeamTemplate;