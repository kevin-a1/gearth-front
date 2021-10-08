import React, {useState, useEffect, useRef} from 'react';
import classNames from 'classnames';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';

import {InputSwitch} from 'primereact/inputswitch';
import {people, findUserByPerson} from '../../api/data';

export const Persons = () => {
    const [switchValue, setSwitchValue] = useState(false);
    const [persons, setPersons] = useState(null);
    const [person, setPerson] = useState(emptyPerson);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [deletePersonDialog, setDeletePersonDialog] = useState(false);
    const [deletePersonsDialog, setDeletePersonsDialog] = useState(false);
    const [personDialog, setPersonDialog] = useState(false);
    const [userDialog, setUserDialog] = useState(false);
    const [user, setUser] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        setPersons(people)
    }, []);

    const emptyPerson = {
        id: 0,
        photo: '',
        name: '',
        lname: '',
        email: '',
        gender: '',
        identification: '',
        status: 1
    };
    const openNew = () => {
        setPerson(emptyPerson);
        setSubmitted(false);
        setPersonDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPersonDialog(false);
    };

    const hideDeletePersonDialog = () => {
        setDeletePersonDialog(false);
    };

    const hideDeletePersonsDialog = () => {
        setDeletePersonsDialog(false);
    };

    const hideViewUserDialog = () => {
        setUserDialog(false);
    }
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].id === id) {
                index = i;
                break
            }
        }
        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const savePerson = () => {
        setSubmitted(true);

        if (person.name.trim()) {

            let _persons = [...persons];
            let _person = {...person};

            if (person.id) {
                const index = findIndexById(person.id);

                _persons[index] = _person;
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Person Updated', life: 3000});
            } else {

                _person.id = createId();
                _persons.push(_person);
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Person Created', life: 3000});
            }
            setPersons(_persons);
            setPersonDialog(false);
            setPerson(emptyPerson);
        }
    };

    const editPerson = (p) => {
        setPerson({...p});
        setPersonDialog(true);
    };

    const viewUser = (p) => {
        let dato = findUserByPerson(p.id);
        setUserDialog(true);
        setUser(dato);
    }

    const confirmDeletePerson = (r) => {
        setPerson(r);
        setDeletePersonDialog(true);
    };

    const deletePerson = () => {
        let _persons = persons.filter(val => val.id !== person.id);
        setPersons(_persons);
        setDeletePersonDialog(false);
        setPerson(emptyPerson);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Person Deleted', life: 3000});
    };


    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePersonsDialog(true);
    };

    const deleteSelectedPersons = () => {
        let _persons = persons.filter(val => !selectedPerson.includes(val));
        setPersons(_persons);
        setDeletePersonsDialog(false);
        setSelectedPerson(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Persons Deleted', life: 3000});
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _person = {...person};
        _person[`${name}`] = val;
        setPerson(_person)
    };

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={openNew}/>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2"
                        onClick={confirmDeleteSelected} disabled={!selectedPerson || !selectedPerson.length}/>
            </>
        )
    };

    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}/>
            </>
        )
    };


    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        )
    };
    const lnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Last Name</span>
                {rowData.lname}
            </>
        )
    };
    const identBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Identification</span>
                {rowData.identification}
            </>
        )
    };
    const genderBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Gender</span>
                {rowData.gender}
            </>
        )
    };
    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        )
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-1"
                        onClick={() => editPerson(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-1"
                        onClick={() => confirmDeletePerson(rowData)}/>
                <Button icon="pi pi-user" className="p-button-rounded " tooltip="View User"
                        onClick={() => viewUser(rowData)}/>
            </div>
        )
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Persons</h5>
            <i>{(selectedPerson && selectedPerson.length > 0) && `Selected (${selectedPerson.length})`}</i>
            <span className="p-input-icon-left">
          <i className="pi pi-search"/>
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
      </span>
        </div>
    );

    const dialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savePerson}/>
        </>
    );

    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePersonDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePerson}/>
        </>
    );

    const editUser = (
        <>
            <Button label="Edit" icon="pi pi-times" className="p-button-text"/>
            <Button label="OK" icon="pi pi-check" className="p-button-text" onClick={hideViewUserDialog}/>
        </>
    );

    const deletesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePersonsDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedPersons}/>
        </>
    );


    return (
        <>
            <div className="p-grid crud-demo">
                <div className="p-col-12">
                    <div>
                        <Toast ref={toast}/>
                        <Toolbar className="p-mb-4 p-toolbar" left={leftToolbarTemplate}
                                 right={rightToolbarTemplate}></Toolbar>
                        <DataTable ref={dt} value={persons} selection={selectedPerson}
                                   onSelectionChange={(e) => setSelectedPerson(e.value)}
                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                   className="datatable-responsive"
                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                   globalFilter={globalFilter} emptyMessage="No person found." header={header}>
                            <Column selectionMode="multiple" headerStyle={{width: '3rem'}}></Column>
                            <Column field="identification" header="Identification" sortable
                                    body={identBodyTemplate}></Column>
                            <Column field="name" header="Name" sortable body={nameBodyTemplate}></Column>
                            <Column field="lname" header="Last Name" sortable body={lnameBodyTemplate}></Column>
                            <Column field="email" header="Email" sortable body={emailBodyTemplate}></Column>
                            <Column field="gender" header="Gender" sortable body={genderBodyTemplate}></Column>

                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>

                        <Dialog visible={personDialog} style={{width: '350px'}} header="Person" modal
                                className="p-fluid" footer={dialogFooter} onHide={hideDialog}>
                            <div className="p-field">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" value={person?.name} onChange={(e) => onInputChange(e, 'name')}
                                           required autoFocus
                                           className={classNames({'p-invalid': submitted && !person?.name})}/>
                                {submitted && !person?.name && <small className="p-invalid">Name is required.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="lname">Last Name</label>
                                <InputText id="lname" value={person?.lname} onChange={(e) => onInputChange(e, 'lname')}
                                           required autoFocus
                                           className={classNames({'p-invalid': submitted && !person?.lname})}/>
                                {submitted && !person?.lname &&
                                <small className="p-invalid">Last Name is required.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={person?.email} onChange={(e) => onInputChange(e, 'email')}
                                           required autoFocus
                                           className={classNames({'p-invalid': submitted && !person?.email})}/>
                                {submitted && !person?.email && <small className="p-invalid">Email is required.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="gender">Gender</label>
                                <InputText id="gender" value={person?.gender}
                                           onChange={(e) => onInputChange(e, 'gender')} required autoFocus
                                           className={classNames({'p-invalid': submitted && !person?.gender})}/>
                                {submitted && !person?.gender &&
                                <small className="p-invalid">Gender is required.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="status" className="p-mr-2">Status</label>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <InputSwitch id="status" className="p-mr-2" checked={switchValue}
                                                 onChange={(e) => setSwitchValue(e.value)} autoFocus/>
                                    <i>{(switchValue) ? 'Active' : 'Inactive'}</i>
                                </div>
                            </div>
                        </Dialog>

                        <Dialog visible={deletePersonDialog} style={{width: '450px'}} header="Confirm" modal
                                footer={deleteDialogFooter} onHide={hideDeletePersonDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                                {person && <span>Are you sure you want to delete <b>{person?.name}</b></span>}
                            </div>
                        </Dialog>
                        <Dialog visible={deletePersonsDialog} style={{width: '450px'}} header="Confirm" modal
                                footer={deletePersonsDialog} onHide={hideDeletePersonsDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                                {person && <span>Are you sure you want to delete the selected persons?</span>}
                            </div>
                        </Dialog>
                        <Dialog visible={userDialog} style={{width: '350px'}} header="User" modal className="p-fluid"
                                footer={editUser} onHide={hideViewUserDialog}>
                            <div>
                                <i className="pi pi-user p-mr-3" style={{fontSize: '2rem'}}/>
                                <br/>
                                <div className="p-field">
                                    <label htmlFor="username">UserName</label>
                                    <InputText id="username" type="text" placeholder={user?.username}></InputText>
                                </div>

                                <div className="p-field">
                                    <label htmlFor="password">Password</label>
                                    <InputText id="password" type="text" placeholder={user?.password}></InputText>
                                </div>
                                <div className="p-field">
                                    <label htmlFor="rol">Rol</label>
                                    <InputText id="rol" type="text" placeholder={user?.rol}></InputText>
                                </div>
                                <div className="p-field">
                                    <label htmlFor="status" className="p-mr-2">Status</label>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <InputSwitch id="status" className="p-mr-2" checked={switchValue}
                                                     onChange={(e) => setSwitchValue(e.value)} autoFocus/>
                                        <i>{(switchValue) ? 'Active' : 'Inactive'}</i>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    )
};

Persons.propTypes = {}
export default Persons;
