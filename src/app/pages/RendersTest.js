import React from 'react';
import { findAllComponents } from '../../api/data';
import useRender from '../../hooks/useRender';

const RendersTest = props => {

    const components = findAllComponents();
    const person = {
        name: 'Andrés',
        lname: 'Sapatanga',
        commentary: 'Excelente servicio',
        schedule: '',
        age: 21,
        members: [
            'Andrés',
            'Mónica',
            'Gabriela',
        ],
        volume: 10,
        qualification: 2,
        color: '',
        downloaded: 50,
    }
    const { template } = useRender(components[0], person);
    const { template: template2 } = useRender(components[1], {status: true});

    return (
        <>
            <div className="card">
                <h1>Renders Test</h1>
                {
                    template
                }
                {
                    template2
                }
            </div>
        </>
    )
}

RendersTest.propTypes = {

}

export default RendersTest