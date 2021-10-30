import React, { useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import {Messages} from "primereact/messages";
import { FileUpload } from 'primereact/fileupload';
import { URL_BASE } from '../../../../../../api/urls';
    import { useRepository } from '../../../../../../redux/hooks/useRepository';
    import { Editor } from 'primereact/editor';
import { useToolbox } from '../../../../../../redux/hooks/useToolbox';


export const ToolUses = ({action}) => {


    const {insertToolData,dataCurrent}= useToolbox();


    const message = useRef();


    const [values,setValues] = useState({
        name:"",
        description:"",
        long_description:""
    });

    const [dataTool,setDataTool] = useState({
        use: action==="edit"?dataCurrent?.use:"",
    });

    const addInfoMessageSaved = (status, content) => {
        message.current.show({severity: status, content: content});
    };

    const [dropdownItem, setDropdownItem] = useState(null);
    const [dropdownItem2, setDropdownItem2] = useState(null);
    const dropdownItems = [
        { name: 'Socio Cultural', code: 1 },
        { name: 'Medio Construido', code: 2 },
        { name: 'Político Institucional', code: 3 },
        { name: 'Político Institucional', code: 3 },
    ];
    const dropdownItems2 = [
        { name: 'Demografía', code: 1 },
        { name: 'Medio Construido', code: 2 },
        { name: 'Político Institucional', code: 3 },
        { name: 'Político Institucional', code: 3 },
    ];
    const dropdownItems3 = [
        { name: 'Etnia', code: 1 },
        { name: 'Medio Construido', code: 2 },
        { name: 'Político Institucional', code: 3 },
        { name: 'Político Institucional', code: 3 },
    ];

    const fileUploadHandler = ({files}) => {
        const [file] = files;
        console.log(file);
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            uploadFile(file);
        };
        fileReader.readAsDataURL(file);
    };
    const {use} = dataTool;
    const save = (e) =>{
        e.preventDefault()
        if(use){
            
        insertToolData({opcion: "use",
                        id: dataCurrent?.id,
                        use: use
                    })
        }

       /* if(values?.name && values?.description && values?.long_description && dropdownItem){
            insertRepository({
                name:name,
                description:description,
                long_description:long_description,
                category_id:dropdownItems.code
            });
        }
*/
    }
    const uploadFile = async (invoiceFile) => {
        let formData = new FormData();
        formData.append('file_obj', invoiceFile);
        console.log(dropdownItem);
        

    
    
        /*
        const response = await fetch(`orders/${orderId}/uploadInvoiceFile`,
            {
                method: 'POST',
                body: formData
            },
        );
        */
    };
    
   

    return (
        <div className="p-grid">
            

            

            <div className="p-col-12">
                <div className="card">
                    <h3>Modo de empleo/ usos</h3>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12">
                            <label htmlFor="long_description">Ingrese el texto referente al modo de empleo y usos de la herramienta</label>
                            <Editor style={{height:'320px'}} value={use} onTextChange={(e) => setDataTool({ use: e.htmlValue })}/>
                        </div>
                      
                <Button label= "Guardar" className="p-button-rounded p-mr-2 p-mb-2" onClick={save}/>
                </div> 
                <div style={{ display: "inline-block", width: 250, position: 'fixed', bottom: '0%', left: '140px'}}>
                        <Messages  ref={message}/>
                    </div>
            </div>
            </div>
        </div>
    )
}