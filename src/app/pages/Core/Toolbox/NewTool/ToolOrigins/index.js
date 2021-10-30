import React, { useState,useRef,useEffect } from 'react';
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


export const ToolOrigins = ({setSaved,action}) => {
    const {insertTool,dataCurrent,removeTool}= useToolbox();
    useEffect(() => {
        if(action === "new"){
              removeTool(); 
        }
        return () => {

        }
    }, [])

   
    const[dataTool,setDataTool] = useState({
        image:action==="edit"?dataCurrent?.image:"",
        name:action==="edit"?dataCurrent?.name:"",
        keywords: action==="edit"?dataCurrent?.keywords:"",
        text: action==="edit"?dataCurrent?.origins:"",
        description: action==="edit"?dataCurrent?.description:"",
        url: action==="edit"?dataCurrent?.url:"",
    })


    const message = useRef();


    const [values,setValues] = useState({
        name:"",
        description:"",
        long_description:""
    });

    const handleInputChange = ({target}) =>{

       
        const {name, value} = target;
        console.log(value);
        setDataTool({
            ...dataTool,
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
            setDataTool({
                ...dataTool,
                image:file
            });

            //uploadFile(file);
        };
        fileReader.readAsDataURL(file);
    };


    const save = (e) =>{
    e.preventDefault()
    if (action==="new"){
        if(name && description && url && text && keywords && image)
        console.log(image);
        insertTool({
            name: name,
            description: description,
            url:url,
            origins:text,
            keywords:keywords,
            folder:"toolbox",
            team_id:0,
            type:2,
            dataImage:image
        })
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
    
    const {name,keywords,text,description,image,url} = dataTool;
    console.log(image)
    return (
        <div className="p-grid">
            

            

            <div className="p-col-12">
                <div className="card">
                    <h3>Orígenes y evolución</h3>
                    <div className="p-fluid p-formgrid p-grid">
                    
                    <div className="p-field p-col-12 p-md-12">
                    <h5>Cargar imagen</h5>
                    <img src={image} height="100px" width="auto" alt={name}/>
                    <FileUpload  customUpload={true} multiple accept="text/*" maxFileSize={1000000000000} uploadHandler={fileUploadHandler} chooseLabel="Seleccionar" uploadLabel="Cargar" cancelLabel="Cancelar"/>
                    {image && <span>Debe subir la imagen</span>}
                    </div>

                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" name={"name"} type="text" value={name} onChange={handleInputChange} placeholder="Ingrese el nombre de su herramienta"/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="description">Palabras clave</label>
                            <InputText id="keywords" name={"keywords"} type="text" placeholder="Ingrese separadas por coma" value={keywords} onChange={handleInputChange}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="description">Enlace</label>
                            <InputText id="url" name={"url"} type="text" placeholder="Ingrese la URL" value={url} onChange={handleInputChange}/>
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="text">Ingrese una descripción para la herramienta</label>
                            <Editor style={{height:'320px'}} value={description} onTextChange={(e) => setDataTool({ ...dataTool, description: e.htmlValue })}/>
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="text">Ingrese el texto referente a orígenes y evolución de la herramienta</label>
                            <Editor style={{height:'320px'}} value={text} onTextChange={(e) => setDataTool({ ...dataTool, text: e.htmlValue })}/>
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