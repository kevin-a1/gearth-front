import { Button } from 'primereact/button';
import React, { useEffect, useRef } from 'react';
import imagen from '../../../../assets/flechas.png'
import RadialMenu from "react-radial-menu"
import { BreadCrumb } from 'primereact/breadcrumb';
const Moments = () =>{


    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'MIT' },
        { label: 'Diseñador de modelo' },
        { label: 'Momentos' },

    ];
return (
    <>
   
    <h2 style={{ textAlign: 'center' }}>Etapa III</h2>
    <div className="p-grid crud-demo">

    <div className="flexgrid-demo">
        <row>
    <div className="p-grid">
    <div className="p-col">
        <div className="card image-card">
            <span className="ui-badge"></span>
            <img src={imagen} alt="freya-layout" />
            <div className="image-content">
                <h4>Intuir-idear</h4>
                <p>Es el momento en donde se manifiestan las primeras intuiciones de cómo intervenir en la estructura de la realidad por parte de los diferentes actores y agentes del desarrollo territorial, estas intuiciones evolucionan hacia ideas, las mismas que se materializan en un equipo y un programa de trabajo. Este momento evolucionará y realimentará al resto de momentos.</p>
                <Button type="button" label="Implementar" />
            </div>
        </div>
    </div>
    
    <div className="p-col">
        <div className="card image-card">
            <span className="ui-badge"></span>
            <img src={imagen} alt="freya-layout" />
            <div className="image-content">
                <h4>Comprender-aprender</h4>
                <p>Todos los participantes comprenden los objetivos, metas, teorías, métodos y herramientas del MIT, para luego aprender colectivamente como se estructuran y funcionan los sistemas territorial, espacial y temático (tema del MIT). Este momento se materializa en un documento que defina el estado de situación de estos sistemas en un espaciotiempo específico.</p>
                <Button type="button" label="Implementar" />
            </div>
        </div>
    </div>
    <div className="p-col">
    <div className="card image-card">
            <span className="ui-badge"></span>
            <img src={imagen} alt="freya-layout" />
            <div className="image-content">
                <h4>Crear-proponer</h4>
                <p>Con las capacidades adquiridas de los usuarios en los dos momentos anteriores, se inicia la creatividad colectiva de propuestas para cambiar la realidad territorial, espacial y temática (específica). Este momento se expresa en políticas, programas y proyectos, en modelos de gestión y en planes de manejo específicos.</p>
                <Button type="button" label="Implementar" />
            </div>
        </div>
    </div>
    <div className="p-col">
    <div className="card image-card">
            <span className="ui-badge"></span>
            <img src={imagen} alt="freya-layout" />
            <div className="image-content">
                <h4>Implementar-evaluar</h4>
                <p>En este momento se ejecuta lo creado y propuesto y se verifican las transformaciones que producen en los sistemas. Se materializa este momento en la constatación y evaluación de dichas transformaciones a través de mecanismos de seguimiento y especialmente de la aplicación de variables e indicadores estructurados específicamente para cambios y transformaciones específicas.</p>
                <Button type="button" label="Implementar" />
            </div>
        </div>
    </div>
    <div className="p-col">
    <div className="card image-card">
            <span className="ui-badge"></span>
            <img src={imagen} alt="freya-layout" />
            <div className="image-content">
                <h4>Capitalizar-realimentar</h4>
                <p>La aplicación de un MIT genera y transforma cierta cantidad de principios, teorías, métodos y herramientas –es decir conocimiento- sobre temas concretos del desarrollo territorial sostenible. La aplicación del mismo produce experiencias y aprendizaje. En este sentido este componente tiene el propósito de capitalizar dicho conocimiento y realimentar los procesos de elaboración e implementación de un MIT. Así garantizamos que el MIT y GEArth se actualicen y aprendan permanentemente.</p>
                .p-col
                <Button type="button" label="Implementar" />
                <Button type="button" label="Implementar" />
            </div>
        </div>
    </div>
    </div>
</row>
</div>
</div>
</>

);

}

export default Moments;