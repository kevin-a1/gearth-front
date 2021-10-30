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


export const ItemOrigins = () => {


    const {insertRepository}= useRepository();


    const message = useRef();


    const [values,setValues] = useState({
        name:"",
        description:"",
        long_description:""
    });

    const handleInputChange = ({target}) =>{

       
        const {name, value} = target;
        console.log(value);
        setValues({
            ...values,
            [ name ]: value
        
        });
    };

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

    const save = (e) =>{
e.preventDefault()
        if(values?.name && values?.description && values?.long_description && dropdownItem){
            insertRepository({
                name:name,
                description:description,
                long_description:long_description,
                category_id:dropdownItems.code
            });
        }

    }
    const uploadFile = async (invoiceFile) => {
        let formData = new FormData();
        formData.append('file_obj', invoiceFile);
        console.log(dropdownItem);
        if(values?.name && values?.description && values?.long_description && dropdownItem){
       
            //errors.name = "Name required";
            axios({
                url: `${URL_BASE}uploads?folder=repository&team_id=1`,
                method: 'POST',
                data: formData,
                headers: {
                'Content-Type': "multipart/form-data"
                }
                }).then((response) => {
                console.log(response.data);
                addInfoMessageSaved('success', response.data);
                
                //toast.current.show({ severity: 'info', summary: 'Success', detail: response.data, life: 3000 });
        
                }).catch((error) => {
                    addInfoMessageSaved('error', error);
                });
        }
        else{
            addInfoMessageSaved('error', "Ingrese toda la información solicitada antes de subir un archivo");
        }

    
    
        /*
        const response = await fetch(`orders/${orderId}/uploadInvoiceFile`,
            {
                method: 'POST',
                body: formData
            },
        );
        */
    };
    
    const {name,description,long_description} = values;

    return (
        <div className="p-grid">
            

            

            <div className="p-col-12">
                <div className="card">
                    <h3>Significado de origen/ Significado local</h3>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" name={"name"} type="text" value={name} onChange={handleInputChange} placeholder="Ingrese el nombre de su elemento de base de conocimiento"/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="description">Palabras clave</label>
                            <InputText id="description" name={"description"} type="text" placeholder="Ingrese separadas por coma" value={description} onChange={handleInputChange}/>
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="long_description">Ingrese el texto referente a significado local</label>
                            <Editor style={{height:'320px'}} value={long_description} onTextChange={(e) => setValues({ ...values, long_description: e.htmlValue })}/>
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="long_description">Ingrese el texto referente a significado de origen</label>
                            <Editor style={{height:'320px'}} value={long_description} onTextChange={(e) => setValues({ ...values, long_description: e.htmlValue })}/>
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