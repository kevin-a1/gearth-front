import React, {useState, useEffect, useRef} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';

import {APPUSERS} from "../../../../api/data";

export const AppUsers = () => {
    const [persons, setPersons] = useState(null);
    const [person, setPerson] = useState(emptyPerson);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [deletePersonDialog, setDeletePersonDialog] = useState(false);
    const [banPersonDialog, setBanPersonDialog] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        setPersons(APPUSERS)
    }, []);

    const emptyPerson = {
        id: 0,
        photo: '',
        name: '',
        lname: '',
        email: '',
        gender: '',
        status: 1,
        created_at: '',
        updated_at: ''
    };


    const statusBodyTemplate = (rowData) => {
        const valueStatus = (status) => (
            (status === 1) ? 'Active':'Inactive'
        );
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${(rowData.status === 1) ? 'instock' : 'outofstock'}`}>{ valueStatus(rowData.status) }</span>
            </>
        );
    }

    const profilePicBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Profile pic</span>
                <img alt={data.name} src={`assets/demo/images/avatar/${data.photo}`} width="32" style={{ verticalAlign: 'middle' }} />
            </>
        );
    };

    const hideDeletePersonDialog = () => {
        setDeletePersonDialog(false);
    };

    const hideBanPersonDialog = () => {
        setBanPersonDialog(false);
    };

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

    const confirmDeletePerson = (r) => {
        setPerson(r);
        setDeletePersonDialog(true);
    };

    const confirmBanPerson = (r) => {
        setPerson(r);
        setBanPersonDialog(true);
    };

    const deletePerson = () => {
        let _persons = persons.filter(val => val.id !== person.id);
        setPersons(_persons);
        setDeletePersonDialog(false);
        setPerson(emptyPerson);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Person Deleted', life: 3000});
    };

    const banPerson = () => {
        let _persons = [...persons];
        const index = findIndexById(person.id);
        const newStatus = _persons[index].status === 1 ? 2 : 1;
        _persons[index].status = newStatus;
        setBanPersonDialog(false);
        toast.current.show({severity: 'success', summary: 'Successful', detail: `Person ${newStatus === 1 ? 'unbanned' : 'banned'}`, life: 3000});

        setPersons(_persons);
        setPerson(emptyPerson);
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-1"
                        onClick={() => confirmDeletePerson(rowData)} tooltip="Delete user"/>
                <Button icon="pi pi-ban" className="p-button-rounded " tooltip="Change user status"
                        onClick={() => confirmBanPerson(rowData)}/>
            </div>
        )
    };

    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePersonDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePerson}/>
        </>
    );
    const banDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideBanPersonDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={banPerson}/>
        </>
    );

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage App Users</h5>
            <i>{(selectedPerson && selectedPerson.length > 0) && `Selected (${selectedPerson.length})`}</i>
            <span className="p-input-icon-left">
          <i className="pi pi-search"/>
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
      </span>
        </div>
    );

    return (
        <>
            <div className="p-grid crud-demo">
                <div className="p-col-12">
                    <div>
                        <Toast ref={toast}/>

                        <DataTable ref={dt} value={persons} selection={selectedPerson}
                                   onSelectionChange={(e) => setSelectedPerson(e.value)}
                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                   className="datatable-responsive"
                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                   globalFilter={globalFilter} emptyMessage="No app users found." header={header}>

                            <Column field="pic" header="Profile pic" body={profilePicBodyTemplate}/>
                            <Column field="name" header="Name" sortable body={nameBodyTemplate}/>
                            <Column field="lname" header="Last Name" sortable body={lnameBodyTemplate}/>
                            <Column field="email" header="Email" sortable body={emailBodyTemplate}/>
                            <Column field="gender" header="Gender" sortable body={genderBodyTemplate}/>
                            <Column field="status" header="Status" sortable body={statusBodyTemplate}/>
                            <Column body={actionBodyTemplate}/>
                        </DataTable>


                        <Dialog visible={deletePersonDialog} style={{width: '450px'}} header="Confirm" modal
                                footer={deleteDialogFooter} onHide={hideDeletePersonDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                                {person && <span>Are you sure you want to delete <b>{person?.name}</b></span>}
                            </div>
                        </Dialog>

                        <Dialog visible={banPersonDialog} style={{width: '450px'}} header="Confirm" modal
                                footer={banDialogFooter} onHide={hideBanPersonDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                                {person && <span>Are you sure you want to {person?.status === 1 ? 'ban' : 'unban'} <b>{person?.name}</b></span>}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AppUsers;
