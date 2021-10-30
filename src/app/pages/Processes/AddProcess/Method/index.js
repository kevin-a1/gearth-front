import React, { useState } from 'react';


import { Editor } from 'primereact/editor';

const MethodModel = ( ) => {

    
    const [values,setValues] = useState({
        name:"",
        description:"",
        long_description:""
    });
    
  
       
    const {description} = values;
    return (
        <>
            <h3>
                Defina el Método de su Proceso
            </h3>
            <div className="p-field p-col-12">
                            <label htmlFor="long_description">Describa los principios metodológicos</label>
                            <Editor style={{height:'320px'}} value={description} onTextChange={(e) => setValues({ ...values, description: e.htmlValue })}/>
                        </div>
        </>
    );
    
    
    
}


export default MethodModel;