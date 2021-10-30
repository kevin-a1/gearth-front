import { BreadCrumb } from "primereact/breadcrumb";
import {TabMenu} from "primereact/tabmenu";
import React, {useState} from 'react';
import { ItemMethod } from "./ItemMethod";
import { ItemOrigins } from "./ItemOrigins";
import { ItemPurpose } from "./ItemPurpose";
import { ItemTheory } from "./ItemTheory";




const NewItem = () =>{
    const wizardItems = [
        {id: 0, label: 'Significado de origen/ local', icon: 'pi pi-th-large'},
        {id: 1, label: 'Propósito', icon: 'pi pi-users'},
        {id: 2, label: 'Teoría', icon: 'pi pi-eye'},
        {id: 3, label: 'Método', icon: 'pi pi-eye'},
        {id: 4, label: 'Herramienta', icon: 'pi pi-eye'},
        {id: 5, label: 'La Dualidad', icon: 'pi pi-eye'},
        {id: 6, label: 'Interacciones clave', icon: 'pi pi-eye'},
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
                    <h3>Base de conocimiento</h3>
                    <TabMenu model={wizardItems} onTabChange={(e) => {
                        tabChangeHandler(e.value)
                    }} activeItem={tabSelected}/>

                    {
                        tabSelected.id === 0 ?
                            <ItemOrigins/>
                            : tabSelected.id === 1 ?
                            <ItemPurpose/>
                            :tabSelected.id === 2 ?
                            <ItemTheory/>
                            :tabSelected.id === 3 ?
                            <ItemMethod/>
                            :tabSelected.id === 4 ?
                            <ItemOrigins/>
                            :tabSelected.id === 5 ?
                            <ItemOrigins/>
                            : ""}
                </div>
            </div>


        </>
    );

    
};

export default NewItem;