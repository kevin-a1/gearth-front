
import {TabMenu} from "primereact/tabmenu";
import React, {useState} from 'react';

import SocialNetwork from "../../ModelDesigner/SocialNetwork/SocialNetwork";

import PurposeModel from "../Purpose";
import TheoryModel from "../Theory";
import MethodModel from "./Method";
import ToolsModel from "../Tools";

const AddProcess = () =>{
    const wizardItems = [
        {id: 0, label: 'Propósito', icon: 'pi pi-th-large'},
        {id: 1, label: 'Teoría', icon: 'pi pi-users'},
        {id: 2, label: 'Método', icon: 'pi pi-eye'},
        {id: 3, label: 'Herramientas', icon: 'pi pi-eye'},
        {id: 4, label: 'Recursos', icon: 'pi pi-eye'},
        {id: 5, label: 'Actividades', icon: 'pi pi-eye'},
        {id: 6, label: 'Resultados', icon: 'pi pi-eye'},
        {id: 7, label: 'Indicadores', icon: 'pi pi-eye'},
        {id: 8, label: 'Riesgos', icon: 'pi pi-eye'},
        {id: 9, label: 'Aprendizaje', icon: 'pi pi-eye'},
        {id: 10, label: 'Entorno', icon: 'pi pi-eye'},
    ];

    const [tabSelected, setTabSelected] = useState(wizardItems[0]);

    const tabChangeHandler = (tab) => {
        setTabSelected(tab);
    };


    return (
        <>

            <div className="p-col-12 p-md-12">
                <div className="card card-w-title">
                    <h5>Componentes del Proceso</h5>
                    <TabMenu model={wizardItems} onTabChange={(e) => {
                        tabChangeHandler(e.value)
                    }} activeItem={tabSelected}/>

                    {
                        tabSelected.id === 0 ?
                            <PurposeModel/>
                            : tabSelected.id === 1 ?
                            <TheoryModel/>
                            :tabSelected.id === 2 ?
                            <MethodModel/>
                            :tabSelected.id === 3 ?
                            <ToolsModel/>
                            :tabSelected.id === 4 ?
                            <SocialNetwork/>
                            :"tab 3"}
                </div>
            </div>


        </>
    );

    
};

export default AddProcess;