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
import { findAllMenuRoles, findAllPlans, findAllRoles, findRoleById, findPlanById } from '../../api/data';
import { AutoComplete } from 'primereact/autocomplete';

const MenuRole = () => {

    const [selectedAutoValueRoles, setSelectedAutoValueRoles] = useState(null);
    const [autoFilteredValueRoles, setAutoFilteredValueRoles] = useState([]);
    const [autoValueRoles, setAutoValueRoles] = useState(null);
    const [selectedAutoValueMenus, setSelectedAutoValueMenus] = useState(null);
    const [autoFilteredValueMenus, setAutoFilteredValueMenus] = useState([]);
    const [autoValueMenus, setAutoValueMenus] = useState(null);
    const [switchValue, setSwitchValue] = useState(true);

    const [menuRoles, setMenuRoles] = useState(null);
    const [menuRole, setMenuRole] = useState(emptyMenuRole);
    const [selectedMenuRoles, setSelectedMenuRoles] = useState(null);
    const [menuRoleDialog, setMenuRoleDialog] = useState(false);
    const [deleteMenuRoleDialog, setDeleteMenuRoleDialog] = useState(false);
    const [deleteMenuRolesDialog, setDeleteMenuRolesDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    const emptyMenuRole = {
        id: 0,
        name: '',
        role_id: null,
        menu_id: null,
        status: 1
    }

    useEffect(() => {

        let dataMenus = []
        let dataRoles = []

        for (const p of findAllPlans()) {
            console.log(p);
            dataMenus.push({
                name: p.name,
                id: p.id,
            });
        }

        for (const r of findAllRoles()) {
            dataRoles.push({
                name: r.name,
                id: r.id,
            });
        }

        setMenuRoles( findAllMenuRoles() );
        setAutoValueMenus( dataMenus );
        setAutoValueRoles( findAllRoles() );

    }, [submitted]);

    const openNew = () => {
        setMenuRole(emptyMenuRole);
        setSubmitted(false);
        setMenuRoleDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setMenuRoleDialog(false);
    }

    const hideDeleteMenuRoleDialog = () => {
        setDeleteMenuRoleDialog(false);
    }

    const hideDeleteMenuRolesDialog = () => {
        setDeleteMenuRolesDialog(false);
    }

    const searchRoles = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValueRoles([...autoValueRoles]);
            }
            else {
                setAutoFilteredValueRoles(autoValueRoles.filter((country) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                }));
            }
        }, 100);
    };

    const searchMenus = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValueMenus([...autoValueMenus]);
            }
            else {
                setAutoFilteredValueMenus(autoValueMenus.filter((country) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                }));
            }
        }, 100);
    };

    const saveMenuRole = () => {
        setSubmitted(true);

        if (menuRole.name.trim()) {

            let _menuRoles = [...menuRoles];
            let _menuRole = { ...menuRole };

            if (menuRole.id) {
                const index = findIndexById(menuRole.id);

                _menuRoles[index] = _menuRole;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Menu Role Updated', life: 3000 });
            }
            else {
                _menuRole.id = createId();
                _menuRoles.push(_menuRole);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Menu Role Created', life: 3000 });
            }

            setMenuRoles(_menuRoles);
            setMenuRoleDialog(false);
            setMenuRole(emptyMenuRole);
        }
    }

    const editMenuRole = ( r ) => {
        setMenuRole({ ...r });
        setMenuRoleDialog(true);
    }

    const confirmDeleteMenuRole = ( r ) => {
        setMenuRole(r);
        setDeleteMenuRoleDialog(true);
    }

    const deleteMenuRole = () => {
        
        let _menuRoles = menuRoles.filter(val => val.id !== menuRole.id);
        setMenuRoles(_menuRoles);
        setDeleteMenuRoleDialog(false);
        setMenuRole(emptyMenuRole);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Menu Role Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < menuRoles.length; i++) {
            if (menuRoles[i].id === id) {
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
        setDeleteMenuRolesDialog(true);
    }

    const deleteSelectedMenuRoles = () => {

        let _menuRoles = menuRoles.filter(val => !selectedMenuRoles.includes(val));
        setMenuRoles(_menuRoles);
        setDeleteMenuRolesDialog(false);
        setSelectedMenuRoles(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Menu Roles Deleted', life: 3000 });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _menuRole = { ...menuRole };
        _menuRole[`${name}`] = val;

        setMenuRole(_menuRole);
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ openNew } />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2" onClick={ confirmDeleteSelected } disabled={!selectedMenuRoles || !selectedMenuRoles.length} />
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

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const roleBodyTemplate = (rowData) => {

        const role = findRoleById(rowData.role_id);

        return (
            <>
                <span className="p-column-title">Name</span>
                { role.name }
            </>
        );
    }

    const menuBodyTemplate = (rowData) => {

        const plan = findPlanById(rowData.menu_id);

        return (
            <>
                <span className="p-column-title">Name</span>
                { plan.name }
            </>
        );
    }

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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => editMenuRole(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteMenuRole(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Menu Roles</h5>
            <i>{ (selectedMenuRoles && selectedMenuRoles.length > 0) && `Selected (${selectedMenuRoles.length})` }</i>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const menuRoleDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ hideDialog } />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ saveMenuRole } />
        </>
    );

    const deleteMenuRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteMenuRoleDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteMenuRole } />
        </>
    );

    const deleteMenuRolesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteMenuRolesDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteSelectedMenuRoles } />
        </>
    );

    return (
        <>
            <div className="p-grid crud-demo">
                <div className="p-col-12">
                    <div className="card">
                        <Toast ref={ toast } />
                        <Toolbar className="p-mb-4 p-toolbar" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar>

                        <DataTable ref={ dt } value={ menuRoles } selection={ selectedMenuRoles } onSelectionChange={(e) => setSelectedMenuRoles(e.value)}
                            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            globalFilter={ globalFilter } emptyMessage="No menu roles found." header={ header }>

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="id" header="ID" sortable body={ idBodyTemplate }></Column>
                            <Column field="name" header="Name" sortable body= { nameBodyTemplate }></Column>
                            <Column field="role_id" header="Role" sortable body={ roleBodyTemplate } ></Column>
                            <Column field="menu_id" header="Menu" sortable body={ menuBodyTemplate } ></Column>
                            <Column field="status" header="Status" sortable body= { statusBodyTemplate }></Column>
                            <Column field="Actions" body={ actionBodyTemplate }></Column>

                        </DataTable>

                        <Dialog visible={ menuRoleDialog } style={{ width: '350px' }} header="Menu Role Details" modal className="p-fluid" footer={ menuRoleDialogFooter } onHide={ hideDialog } >

                            <div className="p-field">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" value={ menuRole?.name } onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !menuRole?.name })} />
                                { submitted && !menuRole?.name && <small className="p-invalid">Name is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="role_id">Role</label>
                                <AutoComplete placeholder="Search Role" id="role_id" dropdown value={ selectedAutoValueRoles } onChange={(e) => setSelectedAutoValueRoles(e.value)} suggestions={ autoFilteredValueRoles } completeMethod={ searchRoles } field="name" className={classNames({ 'p-invalid': submitted && !menuRole?.role_id })} />
                                { submitted && !menuRole?.role_id && <small className="p-invalid">Role is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="menu_id">Menu</label>
                                <AutoComplete placeholder="Search Menu" id="menu_id" dropdown value={ selectedAutoValueMenus } onChange={(e) => setSelectedAutoValueMenus(e.value)} suggestions={ autoFilteredValueMenus } completeMethod={ searchMenus } field="name" className={classNames({ 'p-invalid': submitted && !menuRole?.menu_id })} />
                                { submitted && !menuRole?.menu_id && <small className="p-invalid">Rol is required.</small> }
                            </div>

                            <div className="p-field" >
                                <label htmlFor="status" className="p-d-block">Status</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputSwitch id='status' className="p-mr-2" checked={ switchValue } onChange={(e) => setSwitchValue(e.value)} autoFocus />
                                    <i>{ (switchValue) ? 'Active':'Inactive' }</i>
                                </div>
                            </div> 

                        </Dialog>

                        <Dialog visible={ deleteMenuRoleDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deleteMenuRoleDialogFooter } onHide={ hideDeleteMenuRoleDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                {menuRole && <span>Are you sure you want to delete <b>{menuRole?.name}</b>?</span>}
                            </div>
                        </Dialog>

                        <Dialog visible={ deleteMenuRolesDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deleteMenuRolesDialogFooter } onHide={ hideDeleteMenuRolesDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                { menuRole && <span>Are you sure you want to delete the selected menu role?</span> }
                            </div>
                        </Dialog>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

MenuRole.propTypes = {

}

export default MenuRole
