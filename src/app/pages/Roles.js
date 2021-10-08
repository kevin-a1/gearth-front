import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { getRoles } from '../../redux/actions/rol.actions';
import { useSelector } from 'react-redux';
import * as tableTemplates from './utils/templates/tableTemplates';

const Roles = () => {

    const [ roles, setRoles ] = useState(null);
    const [ role, setRole ] = useState(emptyRole);
    const [ selectedRoles, setSelectedRoles ] = useState(null);
    const [ roleDialog, setRoleDialog ] = useState(false);
    const [ deleteRoleDialog, setDeleteRoleDialog ] = useState(false);
    const [ deleteRolesDialog, setDeleteRolesDialog ] = useState(false);
    const [ globalFilter, setGlobalFilter ] = useState([]);
    const [ submitted, setSubmitted ] = useState(false);
    const [ switchValue, setSwitchValue ] = useState(true);
    const user = useSelector((state) => state.LoginState.data);
    const toast = useRef(null);
    const dt = useRef(null);

    const emptyRole = {
        id: 0,
        name: '',
        status: 1,
    }

    const loadData = async () => {
        setRoles(await getRoles(user?.access_token))
    }

    useEffect(() => {
        loadData();
    }, []);

    const openNew = () => {
        setRole(emptyRole);
        setSubmitted(false);
        setRoleDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setRoleDialog(false);
    }

    const hideDeleteRoleDialog = () => {
        setDeleteRoleDialog(false);
    }

    const hideDeleteRolesDialog = () => {
        setDeleteRolesDialog(false);
    }

    const saveRole = () => {
        setSubmitted(true);

        if (role.name.trim()) {

            let _roles = [...roles];
            let _role = { ...role };

            if (role.id) {
                const index = findIndexById(role.id);

                _roles[index] = _role;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 });
            }
            else {
                _role.id = createId();
                _roles.push(_role);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 3000 });
            }

            setRoles(_roles);
            setRoleDialog(false);
            setRole(emptyRole);
        }
    }

    const editRole = ( r ) => {
        setRole({ ...r });
        setRoleDialog(true);
    }

    const confirmDeleteRole = ( r ) => {
        setRole(r);
        setDeleteRoleDialog(true);
    }

    const deleteRole = () => {
        
        let _roles = roles.filter(val => val.id !== role.id);
        setRoles(_roles);
        setDeleteRoleDialog(false);
        setRole(emptyRole);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteRolesDialog(true);
    }

    const deleteSelectedRoles = () => {

        let _roles = roles.filter(val => !selectedRoles.includes(val));
        setRoles(_roles);
        setDeleteRolesDialog(false);
        setSelectedRoles(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Roles Deleted', life: 3000 });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _role = { ...role };
        _role[`${name}`] = val;

        setRole(_role);
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ openNew } />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2" onClick={ confirmDeleteSelected } disabled={!selectedRoles || !selectedRoles.length} />
            </>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={ exportCSV } />
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>

            <span className="p-column-title">Actions</span>
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => editRole(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteRole(rowData)} />
            </div>
            </>
        );
    }

    const header = (
        <div className="table-header">
            <h2 className="p-m-0">
                <a>Roles</a>
            </h2>
            <i>{ (selectedRoles && selectedRoles.length > 0) && `Selected (${selectedRoles.length})` }</i>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const roleDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ hideDialog } />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ saveRole } />
        </>
    );

    const deleteRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteRoleDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteRole } />
        </>
    );

    const deleteRolesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteRolesDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteSelectedRoles } />
        </>
    );

    return (
        <>
            <div className="p-grid crud-demo">
                <div className="p-col-12">
                    <div className="card">
                        <Toast ref={ toast } />
                        <Toolbar className="p-mb-4 p-toolbar" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar>

                        <DataTable ref={ dt } value={ roles } selection={ selectedRoles } onSelectionChange={(e) => setSelectedRoles(e.value)}
                            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" globalFilter={ globalFilter } emptyMessage="No roles found." header={ header }>

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="id" header="ID" sortable body={ tableTemplates.idBodyTemplate }></Column>
                            <Column field="name" header="Name" sortable body= { tableTemplates.nameBodyTemplate }></Column>
                            <Column field="status" header="Status" sortable body= { tableTemplates.statusBodyTemplate }></Column>
                            <Column header="Actions" body={ actionBodyTemplate }></Column>

                        </DataTable>

                        <Dialog visible={ roleDialog } style={{ width: '350px' }} header="Role Details" modal className="p-fluid" footer={ roleDialogFooter } onHide={ hideDialog } >

                            <div className="p-field">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" value={ role?.name } onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !role?.name })} />
                                { submitted && !role?.name && <small className="p-invalid">Name is required.</small> }
                            </div>

                            <div className="p-field" >
                                <label htmlFor="name" className="p-d-block">Status</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputSwitch id='status' className="p-mr-2" checked={ switchValue } onChange={(e) => setSwitchValue(e.value)} autoFocus />
                                    <i>{ (switchValue) ? 'Active':'Inactive' }</i>
                                </div>
                            </div> 

                        </Dialog>

                        <Dialog visible={ deleteRoleDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deleteRoleDialogFooter } onHide={ hideDeleteRoleDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                {role && <span>Are you sure you want to delete <b>{role?.name}</b>?</span>}
                            </div>
                        </Dialog>

                        <Dialog visible={ deleteRolesDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deleteRolesDialogFooter } onHide={ hideDeleteRolesDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                { role && <span>Are you sure you want to delete the selected roles?</span> }
                            </div>
                        </Dialog>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

Roles.propTypes = {

}

export default Roles;
