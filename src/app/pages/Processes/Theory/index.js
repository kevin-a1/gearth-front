import React, { useState } from 'react';


import { Editor } from 'primereact/editor';

const TheoryModel = ( ) => {

    
    const [values,setValues] = useState({
        name:"",
        description:"",
        long_description:""
    });
    

    
  
       
    const {description} = values;
    return (
        <>
            <h3>
                Defina la Teoría de su Proceso
            </h3>
            <div className="p-field p-col-12">
                            <label htmlFor="long_description">Describa los principios teóricos</label>
                            <Editor style={{height:'320px'}} value={description} onTextChange={(e) => setValues({ ...values, description: e.htmlValue })}/>
                        </div>
        </>
    );
    
    
    
}


export default TheoryModel;
