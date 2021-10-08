import { BreadCrumb } from "primereact/breadcrumb";
import {TabMenu} from "primereact/tabmenu";
import React, {useState} from 'react';
import Processes from "../Processes";
import SocialNetwork from "./SocialNetwork/SocialNetwork";
import GraphModelizer from "../GraphModelizer";
import Stage1 from "./Stage1";
import Moments from "./Stage2/Moments";

const ModelDesigner = () =>{
    const wizardItems = [
        {id: 0, label: 'Información básica', icon: 'pi pi-th-large'},
        {id: 1, label: 'Modelización', icon: 'pi pi-users'},
        {id: 2, label: 'Momentos', icon: 'pi pi-eye'},
        {id: 3, label: 'Procesos y actividades', icon: 'pi pi-eye'},
        {id: 4, label: 'Red de pares progresistas', icon: 'pi pi-eye'},
    ];

    const [tabSelected, setTabSelected] = useState(wizardItems[0]);

    const tabChangeHandler = (tab) => {
        setTabSelected(tab);
    };
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'MIT' },
        { label: 'Diseñador de MIT' },

    ];

    return (
        <>

            <div className="p-col-12 p-md-12">
                <div className="card card-w-title">
                    <h5>Diseñador de MIT</h5>
                    <TabMenu model={wizardItems} onTabChange={(e) => {
                        tabChangeHandler(e.value)
                    }} activeItem={tabSelected}/>

                    {
                        tabSelected.id === 0 ?
                            <Stage1/>
                            : tabSelected.id === 1 ?
                            <GraphModelizer/>
                            :tabSelected.id === 2 ?
                            <Moments/>
                            :tabSelected.id === 3 ?
                            <Processes/>
                            :tabSelected.id === 4 ?
                            <SocialNetwork/>
                            :"tab 3"}
                </div>
            </div>


        </>
    );

    
};

export default ModelDesigner;