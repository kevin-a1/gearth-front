import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { dplans } from '../../api/data';
import { Button } from 'primereact/button';
import '../assets/scss/login.scss';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';

export const SignUp = () =>{
  const [plane] = useState(dplans)
  const [index, setIndex] = useState(0)
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [identification, setIdentification] = useState('');
  const [lastnames, setLastnames] = useState('');
  const [genero, setGenero] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const wizardItems = [
      { label: 'Choose your Plan' }, 
      { label: 'Personal Information' },
      { label: 'User Information' },
      { label: 'Confirmation' }
  ];
  const toast = useRef(null);
  const plan=()=>{
    return(
        <>
        <div className="p-col-20" onClick={person}>
            <div className="p-grid" style={{ margin: '-1rem' }} >
            {
                plane.map( p =>{
                  return<div className="p-col">
                           <div className=" cardif card overview-box blue">
                              <div style={{textAlign:'center'}} className="overview-info">
                                <h1>{p?.name}</h1>
                                <h3>{p?.price}</h3>
                                <ul>{p?.desc} </ul>
                              </div>
                          </div>
                        </div>
                })
            }
            </div>
        </div>
        </>
    )
  };
  const onUpload = () => {
      toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }
  const photo = () =>{
    //let dato;
    //return dato = "https://www.tuexperto.com/wp-content/uploads/2015/07/perfil_01.jpg";
  }

  const persona = ()=>{
    return(
        <>
        <div className="p-fluid">
            <h5>Personal Information</h5>
            <br/><br/>
            <div className="center">
              <div className="card p-d-inline-flex rounded p-shadow-20">
                  <input type="image" src={photo()} className="img-profile" alt="profile"/>
              </div>
                <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
            </div>
            <br/><br/>
            <br/><br/>
            <br/>
            <div className="p-float-label">
                <InputText id="identification1" type="text" value={identification} onChange={(e) => setIdentification(e.target.value)}/>
                <label htmlFor="identification1">Identification</label>
            </div>
            <br/>
            <div className="p-float-label">
                <InputText id="name1" type="text" value={names} onChange={(e) => setNames(e.target.value)}/>
                <label htmlFor="name1">Name</label>
            </div>
            <br/>
            <div className="p-float-label">
                <InputText id="lnames" type="text" value={lastnames} onChange={(e)=> setLastnames(e.target.value)}/>
                <label htmlFor="lnames">Last Names</label>
            </div>
            <br/>
            <div className="p-float-label">
                <InputText id="email1" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="emal1">Email</label>
            </div>
            <br/>
            <div className="p-float-label">
                <InputText id="genero1" type="text" value={genero} onChange={(e) => setGenero(e.target.value)}/>
                <label htmlFor="genero1">Genero</label>
            </div>
            <br/>
            <Button label="Next" className="p-button-rounded p-mr-2 p-mb-2" onClick={user}/>
        </div>
        </>
    )
  };

  const usuario = () =>{
    return (
      <>
      <div className="p-fluid">
          <h5>User</h5>
          <br/>
          <div className="p-float-label">
              <InputText id="username1" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
              <label htmlFor="username1">Username</label>
          </div>
          <br/>
          <div className="p-float-label">
              <InputText id="password1" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <label htmlFor="password1">Password</label>
          </div>
          <br/>
          <Button label="Next" className="p-button-rounded p-mr-2 p-mb-2" onClick={confirm}/>
      </div>
      </>
    )
  };

  const confirma = () =>{
    return(
        <>
          <div className="p-fluid">
            <h4>¡Welcome to GEArth!</h4>
            <h3>Check your email for the confirmation link so you can start creating</h3>
            <Button label="Finish" className="p-button-rounded p-mr-2 p-mb-2"/>
          </div>
        </>
    )
  };

  const person=()=>{
    setIndex(1);
  };

  const user = () =>{
    setIndex(2);
  }

  const confirm = () =>{
    setIndex(3);
  }


  return(
    <div className="card">
    <div style={{display:'flex', verticalAlign:'middle',justifyContent: 'center'}}>
        <div className="p-col-20 p-md-10">
            <div className="card-w-title">
              <h5>Sing Up GEArth</h5>
              <Steps model={wizardItems} readonly={false} activeIndex={index}/>
            </div>
        </div>
    </div>
    <br/><br/>
    <div style={{display:'flex', verticalAlign:'middle',justifyContent: 'center'}} >
        { index === 0 && <div className="card p-col-20 p-md-10">{plan()}</div>}
        { index === 1 && <div>{persona()}</div>}
        { index === 2 && <div>{usuario()}</div>}
        { index === 3 && <div>{confirma()}</div>}
    </div>
    </div>
  )
};

export default SignUp;
