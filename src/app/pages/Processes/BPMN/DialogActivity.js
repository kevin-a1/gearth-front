import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import surveyImg from '../../../assets/img/survey.svg';
import formImg from '../../../assets/img/form.svg';
import socialImg from '../../../assets/img/social-media.svg';
import useForm from '../../../../hooks/useForm';
import classNames from 'classnames';
import inputNumberRender from '../../../../hooks/renders/inputNumberRender';
import ButtonBuilderOption from '../../../components/Process/BPMN/ButtonBuilderOption';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useHistory } from 'react-router';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { updateActivityByTask } from '../../../../redux/actions/activity.actions';
import { useSelector } from 'react-redux';
import { validateActivity } from './utils/validations';

const DialogActivity = ({ dialog, setDialog, process, activity }) => {

    const history = useHistory();
    const toast  = useRef(null);
    const user = useSelector((state) => state.LoginState.data);
    const [ submitted, setSubmitted ] = useState(false);
    const { values, setValues, handleInputChange } = useForm({});

    const builderOptions = [
        {
            id: 1,
            label: 'Form',
            img: formImg,
            type: 'form', //Type of builder
            btnType: 'success',
            callback: () => history.push({

                pathname: '/form/builder',
                state: {
                    process: process,
                    activity: activity,
                    token: user?.access_token,
                },
            }),
        },
        {
            id: 2,
            label: 'Survey',
            img: surveyImg,
            type: 'survey',  //Type of builder
            callback: () => history.push({
                pathname: '/admin/surveys',
                state: {
                    process: process,
                    activity: activity,
                },
            }),
        },
        {
            id: 3,
            label: 'Social',
            img: socialImg,
            type: 'social', //Type of builder
            btnType: 'info',
            callback: () => {
                alert('Coming Soon');
            },
        },
    ];

    useEffect(() => {
        setValues({
            name: activity?.name,
            desc: activity?.description,
            lgDesc: activity?.long_description,
            duration: activity?.duration_in_days,
        });
    }, [ activity ])

    const headerDialogHeader = () => {
        return (
            <>
                <span className="p-text-center" style={{ fontSize: '1.1rem' }}>
                    <a style={{ fontSize: '1rem' }}><i>{activity?.name}</i></a>
                </span>
                <span className={`status-${(activity?.status === 1) ? 'success':'danger'} p-ml-2`}>
                    {(activity?.status === 1) ? 'Active':'Inactive'}
                </span>
            </>
        );
    }

    const handleSubmit = () => {

        setSubmitted(true);

        if (validateActivity(values)) {
            updateActivityByTask(activity?.task_id, values,user?.access_token).then(response => {
                toast.current.show({ severity: 'success', summary: 'Edited Activity', detail: `${activity?.name}`, life: 3000 });
                setSubmitted(false);
            });
        }
    }

    return (
        <Dialog
            header={ headerDialogHeader } visible={ dialog }
            onHide={() => setDialog(false)}
            style={{ width: '340px' }} modal >

            <Toast ref={ toast } />

            <div className="p-fluid">

                <div className="p-field">
                    <label htmlFor="desc" style={{ fontSize: '.9rem' }}>Description</label>
                    <InputText
                        id="desc" name="desc"
                        value={ values?.desc }
                        placeholder="Write activity description"
                        autoComplete="off" required
                        onChange={ handleInputChange }
                        maxLength={100}
                        className={classNames({ 'p-invalid': submitted && !values?.desc })} />
                    { submitted && !values?.desc && <small className="p-invalid color-danger">Description is required.</small> }
                </div>

                <div className="p-field">
                    <label htmlFor="lgDesc" style={{ fontSize: '.9rem' }}>Long Description</label>
                    <InputTextarea
                        id="lgDesc" name="lgDesc"
                        value={ values?.lgDesc }
                        placeholder="Write activity long description"
                        autoComplete="off" required
                        onChange={ handleInputChange }
                        autoResize={ true }
                        maxLength={ 200 }
                        rows={ 3 }
                        className={classNames({ 'p-invalid': submitted && !values?.lgDesc })} />
                    { submitted && !values?.lgDesc && <small className="p-invalid color-danger">Long description is required.</small> }
                </div>

                <div className="p-field">
                    <label htmlFor="duration" style={{ fontSize: '.9rem' }}>Duration (Nro. Days)</label>

                    { inputNumberRender({values, handleInputChange, component: {
                        attributes: {
                            id: 'duration',
                            name: 'duration',
                            required: true,
                            placeholder: "Write activity duration in days",
                            class: classNames({ 'p-invalid': submitted && !values?.duration }),
                        }
                    }}) }

                    { submitted && !values?.duration && <small className="p-invalid color-danger">Duration is required.</small> }
                </div>

                <Button
                    className="p-button p-button-info"
                    label="Save"
                    onClick={ handleSubmit } />
            </div>

            <span
                style={{ fontSize: '.9rem' }}
                className="p-d-block p-my-3 p-text-center" >
                    Build:
            </span>

            <div className="p-text-center">
                {
                    builderOptions.map((builder) => {
                        if (activity?.type != null) {
                            if (activity?.type.toUpperCase() === builder?.type.toUpperCase()) {
                                return <ButtonBuilderOption
                                    key={ builder?.id } btnType={ builder?.btnType }
                                    img={ builder?.img } label={ builder?.label }
                                    callback={ builder?.callback } />
                            }
                        } else {
                            return <ButtonBuilderOption
                                key={ builder?.id } btnType={ builder?.btnType }
                                img={ builder?.img } label={ builder?.label }
                                callback={ builder?.callback } />
                        }
                    })
                }
            </div>
        </Dialog>
    )
}

DialogActivity.propTypes = {
    dialog: PropTypes.bool,
    setDialog: PropTypes.func,
    activity: PropTypes.object,
    process: PropTypes.object,
}

export default DialogActivity
