import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import useForm from '../../../../../hooks/useForm';

import { Editor } from 'primereact/editor';

const ScopeTemplate = ( ) => {

    
    const [values,setValues] = useState({
        name:"",
        description:"",
        long_description:""
    });
    
  
       
    const {description} = values;
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
