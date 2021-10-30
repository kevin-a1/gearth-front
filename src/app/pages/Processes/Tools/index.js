import React, { useState } from 'react';


import { Button } from 'primereact/button';



import { Editor } from 'primereact/editor';
import Toolbox from '../../Core/Toolbox';
import { Sidebar } from 'primereact/sidebar';

const ToolsModel = ( ) => {

    
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    
    const [values,setValues] = useState({
        name:"",
        description:"",
        long_description:""
    });
    
    const previewGraph = () => {
        setVisibleFullScreen(!visibleFullScreen);
      };

    
  
       
    const {description} = values;
    return (
        <>
            <h3>
                Defina la Teoría de su Proceso
            </h3>
            <div className="p-field p-col-12">
            <Button
        label={visibleFullScreen ? "Cerrar" : "Abrir caja de herramientas"} 
        type="button"
        icon={
          visibleFullScreen
            ? "pi pi-angle-double-down"
            : "pi pi-angle-double-up"
        }
        className="p-button-warning"
        onClick={previewGraph}
        style={{
          position: "fixed",
          bottom: "2%",
          right: "1%",
          width: "80px",
          height: "45px",
          zIndex: 10001,
        }}
      />
      <Sidebar
        visible={visibleFullScreen}
        onHide={() => setVisibleFullScreen(false)}
        baseZIndex={1000}
        fullScreen
      >
        <Toolbox />

        <div className="card">
          <Button
            id="SaveB1"
            label="Guardar Modelo"
            className="p-mr-2 p-mb-2 p-button-success"
            
            style={{
              position: "fixed",
              bottom: "1%",
              left: "1%",
              width: "120px",
              height: "45px",
              zIndex: 10001,
            }}
          
          />

          <div
            style={{
              display: "inline-block",
              width: 250,
              position: "fixed",
              bottom: "0%",
              left: "140px",
            }}
          >
            {//<Messages ref={message} />
            }
          </div>
        </div>
      </Sidebar>
                            <label htmlFor="long_description">Describa los principios teóricos</label>
                            <Editor style={{height:'320px'}} value={description} onTextChange={(e) => setValues({ ...values, description: e.htmlValue })}/>
                        </div>
        </>
    );
    
    
    
}


export default ToolsModel;
