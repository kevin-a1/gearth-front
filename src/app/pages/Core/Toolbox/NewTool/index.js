import { BreadCrumb } from "primereact/breadcrumb";
import { Messages } from "primereact/messages";
import {TabMenu} from "primereact/tabmenu";
import React, {useRef, useState,useEffect} from 'react';
import ToolComplementaries from "./ToolComplementaries";
import { ToolMethod } from "./ToolMethod";
import { ToolOrigins } from "./ToolOrigins";
import { ToolResults } from "./ToolResults";
import { ToolTheory } from "./ToolTheory";
import { ToolUses } from "./ToolUses";
import useQueryParams from '../../../../../hooks/useQueryParams';
import { useToolbox } from "../../../../../redux/hooks/useToolbox";


const NewTool = () =>{
    const wizardItems = [
        {id: 0, label: 'Orígenes y evolución', icon: 'pi pi-th-large'},
        {id: 1, label: 'Teoría', icon: 'pi pi-users'},
        {id: 2, label: 'Método', icon: 'pi pi-eye'},
        {id: 3, label: 'Método de empleo/ usos', icon: 'pi pi-eye'},
        {id: 4, label: 'Cambios/ resultados', icon: 'pi pi-eye'},
        {id: 5, label: 'Herramientas complementarias', icon: 'pi pi-eye'},
    ];
    const message = useRef();
    const{getCurrentTool,dataCurrent}=useToolbox();
    const { action,tool_id } = useQueryParams();

    useEffect(() => {
       
        if(action==="edit"){
            getCurrentTool(tool_id);
        }
        
    }, [action])

    const [tabSelected, setTabSelected] = useState(wizardItems[0]);
    const [saved,setSaved] = useState(false)
    const addInfoMessageSaved = (status, content) => {
        message.current.show({severity: status, content: content});
    };

    const tabChangeHandler = (tab) => {
        
        if((saved || tab.id==0) || action==="edit"){
            console.log(tab);
            setTabSelected(tab);
        }
        else{
            setTabSelected(wizardItems[0]);
            //TODO reemplazar por TOAST
            addInfoMessageSaved('error', "Por favor complete los datos en la primera pestaña");
          
        }
            
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
                    <h3>Caja de herramientas</h3>
                    <TabMenu model={wizardItems} onTabChange={(e) => {
                        tabChangeHandler(e.value)
                    }} activeItem={tabSelected} />

                    {
                        tabSelected.id === 0 ?
                            <ToolOrigins setSaved={setSaved} dataCurrent={dataCurrent} action={action}/>
                            : (tabSelected.id === 1 )?
                            <ToolTheory dataCurrent={dataCurrent} action={action}/>
                            :tabSelected.id === 2 ?
                            <ToolMethod dataCurrent={dataCurrent} action={action}/>
                            :tabSelected.id === 3  ?
                            <ToolUses dataCurrent={dataCurrent} action={action}/>
                            :tabSelected.id === 4 ?
                            <ToolResults dataCurrent={dataCurrent} action={action}/>
                            :tabSelected.id === 5 ?
                            <ToolComplementaries dataCurrent={dataCurrent} action={action} tool_id={tool_id}/>
                            :  <>
                            <ToolOrigins setSaved={setSaved} dataCurrent={dataCurrent} action={action}/></>
                            }
                </div>
            </div>
            <div style={{ display: "inline-block", width: 250, position: 'fixed', bottom: '0%', left: '140px'}}>
                        <Messages  ref={message}/>
                    </div>


        </>
    );

    
};

export default NewTool;