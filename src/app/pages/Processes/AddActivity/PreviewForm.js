import React from 'react';
import useFormSchemaRender from '../../../../hooks/useFormSchemaRender';
import useRender from '../../../../hooks/useRender';

const PreviewForm = ({ form }) => {

    const formDataRendered = useFormSchemaRender(form);
    const { template, data } = useRender(formDataRendered, {});

    return (
        <>
            { template }
        </>
    )
}

PreviewForm.propTypes = {

}

export default PreviewForm