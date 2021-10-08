import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { InputTextarea } from 'primereact/inputtextarea';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import useForm from '../../../../../hooks/useForm';
import classNames from 'classnames';
import { values } from 'lodash';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';

const ScopeTemplate = ( ) => {

    const location = useLocation();
    const history = useHistory();
    const [index, setIndex] = useState(0)
    const [submitted, setSubmitted] = useState(false);
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);
    const [autoFilteredValue, setAutoFilteredValue] = useState([]);
    const [autoValue, setAutoValue] = useState(null);
    const { values: process, setValues: setProcess, handleInputChange } = useForm({
        name: '',
        description: '',
        members: [],
    });
    const [values,setValues] = useState({
        name:"",
        description:"",
        long_description:""
    });
    let model;
    const [dropdownItem, setDropdownItem] = useState(null);
    const [dropdownItem2, setDropdownItem2] = useState(null);
    const dropdownItems = [
        { name: 'Socio Cultural', code: 1 },
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
    const uploadFile = async (invoiceFile) => {
        let formData = new FormData();
        formData.append('file_obj', invoiceFile);
    }
  
       
    const {name,description,long_description} = values;
    return (
        <>
            <h3>
                Defina el alcance de su MIT
            </h3>
            <div className="p-field p-col-12">
                            <label htmlFor="long_description">Describa el alcance</label>
                            <Editor style={{height:'320px'}} value={description} onTextChange={(e) => setValues({ ...values, description: e.htmlValue })}/>
                        </div>
        </>
    );
    
    
    
}


export default ScopeTemplate;
