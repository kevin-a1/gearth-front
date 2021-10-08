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
import { dmenu } from '../../api/data';

export const Menu = () =>{
  const [switchValue, setSwitchValue] = useState(false);
  const [menus, setMenus] = useState(null);
  const [menu, setMenu] = useState(emptyMenu);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [deleteMenuDialog, setDeleteMenuDialog] = useState(false);
  const [deleteMenusDialog, setDeleteMenusDialog] = useState(false);
  const [menuDialog, setMenuDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(()=>{
    setMenus(dmenu)
  },[]);

  const emptyMenu = {
    id: 0,
    name: '',
    status: 1,
  };

  const openNew = () => {
      setMenu(emptyMenu);
      setSubmitted(false);
      setMenuDialog(true);
  };

  const hideDialog = () => {
      setSubmitted(false);
      setMenuDialog(false);
  };

  const hideDeleteMenuDialog = () => {
      setDeleteMenuDialog(false);
  };

  const hideDeleteMenusDialog = () => {
      setDeleteMenusDialog(false);
  };

  const findIndexById = (id) =>{
    let index = -1;
    for (let i = 0; i < menus.length; i++ ){
      if (menus[i].id === id){
        index = i;
        break
      }
    }
    return index;
  };

  const createId = () =>{
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++){
      id += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return id;
  };

  const saveMenu = () =>{
    setSubmitted(true);

    if(menu.name.trim()){

      let _menus = [...menus];
      let _menu = {...menu};

      if (menu.id){
        const index = findIndexById(menu.id);

        _menus[index] = _menu;
        toast.current.show({severity:'success', summary:'Successful', detail:'Menu Updated', life:3000});
      }else{

        _menu.id = createId();
        _menus.push(_menu);
        toast.current.show({severity:'success', summary:'Successful', detail:'Menu Created', life:3000});
      }
      setMenus(_menus);
      setMenuDialog(false);
      setMenu(emptyMenu);
    }
  };

  const editMenu = (m) =>{
    setMenu({...m});
    setMenuDialog(true);
  };

  const confirmDeleteMenu = (r) =>{
    setMenu(r);
    setDeleteMenuDialog(true);
  };

  const deleteMenu = () => {
    let _menus = menus.filter(val => val.id !== menu.id);
    setMenus(_menus);
    setDeleteMenuDialog(false);
    setMenu(emptyMenu);
    toast.current.show({severity:'success', summary:'Successful', detail:'Menu Deleted', life:3000});
  };

  const exportCSV = () =>{
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteMenusDialog(true);
  };

  const deleteSelectedMenus = () =>{
    let _menus = menus.filter(val => !selectedMenu.includes(val));
    setMenus(_menus);
    setDeleteMenusDialog(false);
    setSelectedMenu(null);
    toast.current.show({severity:'success', summary:'Successful', detail:'Menus Deleted', life:3000});
  };

  const onInputChange = (e, name) =>{
    const val = (e.target && e.target.value) || '';
    let _menu = {... menu};
    _menu[`${name}`] = val;
    setMenu(_menu)
  };

  const leftToolbarTemplate = () =>{
    return (
        <>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ openNew } />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2" onClick={ confirmDeleteSelected } disabled={!selectedMenu || !selectedMenu.length} />
        </>
    )
  };

  const rightToolbarTemplate = () => {
      return (
          <>
              <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={ exportCSV } />
          </>
      )
  };

  const idBodyTemplate = (rowData) =>{
    return (
      <>
      <span className="p-column-title">ID</span>
      {rowData.id}
      </>
    )
  };
  const nameBodyTemplate = (rowData) =>{
    return (
    <>
    <span className="p-column-title">Name</span>
    {rowData.name}
    </>
  )
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
  };

  const actionBodyTemplate = (rowData) =>{
    return (
      <div className="actions">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-1" onClick={() => editMenu(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-1" onClick={() => confirmDeleteMenu(rowData)} />
      </div>
    )
  };

  const header = (
    <div className="table-header">
      <h5 className = "p-m-0">Manage Menus</h5>
      <i>{ (selectedMenu && selectedMenu.length > 0) && `Selected (${selectedMenu.length})` }</i>
      <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );

  const dialogFooter = (
      <>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ hideDialog } />
          <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ saveMenu } />
      </>
  );

  const deleteDialogFooter = (
      <>
          <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteMenuDialog } />
          <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteMenu } />
      </>
  );

  const deletesDialogFooter = (
    <>
    <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteMenusDialog } />
    <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteSelectedMenus } />
    </>
  );

  return (
    <>
      <div className="p-grid crud-demo">
        <div className = "p-col-12">
          <div>
            <Toast ref = {toast}/>
            <Toolbar className="p-mb-4 p-toolbar" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar>
            <DataTable ref={ dt } value={ menus } selection={ selectedMenu } onSelectionChange={(e) => setSelectedMenu(e.value)}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                globalFilter={ globalFilter } emptyMessage="No plan found." header={ header }>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="id" header="ID" sortable body= { idBodyTemplate }></Column>
                <Column field="name" header="Name" sortable body= { nameBodyTemplate }></Column>
                <Column field="status" header="Status" sortable body= { statusBodyTemplate }></Column>
                <Column body={ actionBodyTemplate }></Column>
            </DataTable>

            <Dialog visible={menuDialog} style ={{width: '350px' }} header="Menu" modal className="p-fluid" footer={ dialogFooter } onHide={ hideDialog } >
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={ menu?.name } onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !menu?.name })} />
                    { submitted && !menu?.name && <small className="p-invalid">Name is required.</small> }
                </div>
                <div className="p-field">
                  <label htmlFor = "status" className="p-mr-2" >Status</label>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <InputSwitch id="status" className="p-mr-2" checked={switchValue} onChange={(e) => setSwitchValue(e.value)} autoFocus />
                    <i>{(switchValue) ? 'Active':'Inactive'}</i>
                  </div>
                </div>
            </Dialog>

            <Dialog visible={deleteMenuDialog} style ={{width:'450px'}} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteMenuDialog}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize:'2rem'}}/>
                {menu && <span>Are you sure you want to delete <b>{menu?.name}</b></span>}
              </div>
            </Dialog>
            <Dialog visible={deleteMenusDialog} style={{width:'450px'}} header="Confirm" modal footer={deleteMenusDialog} onHide={hideDeleteMenusDialog}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize:'2rem'}}/>
                {menu && <span>Are you sure you want to delete the selected menus?</span>}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
};

Menu.propTypes ={

}
export default Menu;
