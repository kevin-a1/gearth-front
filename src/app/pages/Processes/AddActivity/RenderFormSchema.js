import React from 'react'
import { useHistory, useLocation } from "react-router-dom";
import useFormSchemaRender from '../../../../hooks/useFormSchemaRender';
import useRender from '../../../../hooks/useRender';

const RenderFormSchema = props => {

    const location = useLocation();
    const history = useHistory();

    if (!location.state?.activity) history.push('/admin/processes');
    const activity = location.state.activity;

    const formDataRendered = useFormSchemaRender(activity?.schema);
    const { template, data } = useRender(formDataRendered, {});

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Form of <i><a>"{ activity?.name }"</a></i></h2>
            <div className="p-px-6 p-mx-6">
                { template }
            </div>
        </div>
    )
}

export default RenderFormSchema
