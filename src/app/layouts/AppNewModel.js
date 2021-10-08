import React from 'react';
import { Button } from 'primereact/button';
import '../assets/scss/modelos.scss';

const AppNewModel = ( ) =>{
  const menuClick = () =>{
    return(
      alert('Nuevo Menu')
    )
  };

  return(
      <Button className="btn-model p-button-rounded" style={{position: 'fixed', top: '15%', right: 90, width:'75px', height:'75px', zIndex:10}} icon="pi pi-plus" onClick={menuClick} tooltip="New Model"></Button>
  )
}

export default AppNewModel;
