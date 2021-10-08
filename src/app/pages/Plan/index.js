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
import { dplans, findPlanFByPlan } from '../../../api/data';
import { InputNumber } from 'primereact/inputnumber';
import { usePlan } from '../../../redux/hooks/usePlan';

export const Plan = () =>{
  const [switchValue, setSwitchValue] = useState(false);
  const [plans, setPlans] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [plan, setPlan] = useState(emptyPlan);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [deletePlanDialog, setDeletePlanDialog] = useState(false);
  const [deletePlansDialog, setDeletePlansDialog] = useState(false);
  const [planDialog, setPlanDialog] = useState(false);
  const [planfDialog, setPlanfDialog] = useState(false);
  const [planf , setPlanf] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const {listPlans,plansData} = usePlan();

  useEffect(()=>{

    listPlans();
    //setPlans(dplans)
  },[]);

  const emptyPlan = {
    id: 0,
    name: '',
    price:0,
    desc: '',
    members_number:0,
    discount:0.0,
    featured:true,
    status: 0,
  };

  const openNew = () => {
      setPlan(emptyPlan);
      setSubmitted(false);
      setPlanDialog(true);
      setIsNew(true);
  };

  const hideDialog = () => {
      setSubmitted(false);
      setPlanDialog(false);
  };

  const hideDeletePlanDialog = () => {
      setDeletePlanDialog(false);
  };

  const hideDeletePlansDialog = () => {
      setDeletePlansDialog(false);
  };

  const hideViewPlanfDialog = () =>{
    setPlanfDialog(false);
  }
  const findIndexById = (id) =>{
    let index = -1;
    for (let i = 0; i < plans.length; i++ ){
      if (plans[i].id === id){
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

  const savePlan = () =>{
    setSubmitted(true);


    if(plan.name.trim()){


      if (plan.id){
        toast.current.show({severity:'success', summary:'Successful', detail:'Plan Updated', life:3000});
      }else{


        toast.current.show({severity:'success', summary:'Successful', detail:'Plan Created', life:3000});
      }
      //setPlans(_plans);
      setPlanDialog(false);
      setPlan(emptyPlan);
    }
  };

  const editPlan = (p) =>{
    setIsNew(false);
    setPlan({...p});
    setPlanDialog(true);
  };

  const viewPlanf = (p) =>{
    let dato = findPlanFByPlan(p.id);
    setPlanfDialog(true);
    setPlanf(dato);
    console.log(dato);
  }

  const confirmDeletePlan = (r) =>{
    setPlan(r);
    setDeletePlanDialog(true);
  };

  const deletePlan = () => {
    let _plans = plans.filter(val => val.id !== plan.id);
    setPlans(_plans);
    setDeletePlanDialog(false);
    setPlan(emptyPlan);
    toast.current.show({severity:'success', summary:'Successful', detail:'Plan Deleted', life:3000});
  };

  const exportCSV = () =>{
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeletePlansDialog(true);
  };

  const deleteSelectedPlans = () =>{
    let _plans = plans.filter(val => !selectedPlan.includes(val));
    setPlans(_plans);
    setDeletePlansDialog(false);
    setSelectedPlan(null);
    toast.current.show({severity:'success', summary:'Successful', detail:'Plans Deleted', life:3000});
  };

  const onInputChange = (e, name) =>{
    const val = (e.target && e.target.value) || '';
    let _plan = {... plan};
    _plan[`${name}`] = val;
    setPlan(_plan)
  };

  const leftToolbarTemplate = () =>{
    return (
        <>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ openNew } />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2" onClick={ confirmDeleteSelected } disabled={!selectedPlan || !selectedPlan.length} />
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
  const descBodyTemplate = (rowData) =>{
    return (
    <>
    <span className="p-column-title">Description</span>
    {rowData.desc}
    </>
  )
  };

  const nMembersBodyTemplate = (rowData) =>{
    return (
    <>
    <span className="p-column-title">N° Members</span>
    {rowData.members_number}
    </>
  )
  };

  const priceBodyTemplate = (rowData) =>{
    return (
    <>
    <span className="p-column-title">Price</span>
    {rowData.price}
    </>
  )
  };

  const discountBodyTemplate = (rowData) =>{
    return (
      <>
      <span className="p-column-title">Discount</span>
      {rowData.discount}
      </>
    )
  };

  const featuredBodyTemplate = (rowData) =>{
    const valueFeatured = (status) => (
        (status === true) ? 'Yes':'NO'
    );
    return (
      <>
      <span className="p-column-title">Featured</span>
      <span className={`product-badge status-${(rowData.featured === true) ? 'instock' : 'outofstock'}`}>{ valueFeatured(rowData.featured) }</span>
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
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-1" onClick={() => editPlan(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-1" onClick={() => confirmDeletePlan(rowData)} />
        <Button icon="pi pi-ellipsis-h" className="p-button-rounded " tooltip="Features" onClick={() => viewPlanf(rowData)}/>
      </div>
    )
  };

  const header = (
    <div className="table-header">
      <h5 className = "p-m-0">Manage Plans</h5>
      <i>{ (selectedPlan && selectedPlan.length > 0) && `Selected (${selectedPlan.length})` }</i>
      <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );

  const dialogFooter = (
      <>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ hideDialog } />
          <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ savePlan } />
      </>
  );

  const deleteDialogFooter = (
      <>
          <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeletePlanDialog } />
          <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deletePlan } />
      </>
  );

  const editPlanf = (
    <>
    <Button label="Edit" icon="pi pi-times" className="p-button-text" />
    <Button label="OK" icon="pi pi-check" className="p-button-text" onClick={hideViewPlanfDialog}/>
    </>
  );

  const deletesDialogFooter = (
    <>
    <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeletePlansDialog } />
    <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteSelectedPlans } />
    </>
  );

  return (
    <>
      <div className="p-grid crud-demo">
        <div className = "p-col-12">
          <div>
            <Toast ref = {toast}/>
            <Toolbar className="p-mb-4 p-toolbar" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar>
            <DataTable ref={ dt } value={ plansData } selection={ selectedPlan } onSelectionChange={(e) => setSelectedPlan(e.value)}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                globalFilter={ globalFilter } emptyMessage="No plan found." header={ header }>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="id" header="ID" sortable body= { idBodyTemplate }></Column>
                <Column field="name" header="Name" sortable body= { nameBodyTemplate }></Column>
                <Column field="description" header="Description" sortable body= { descBodyTemplate }></Column>
                <Column field="members_number" header="N° Members" sortable body= { nMembersBodyTemplate }></Column>
                <Column field="discount" header="Discount" sortable body= { discountBodyTemplate }></Column>
                <Column field="featured" header="Featured" sortable body= { featuredBodyTemplate}></Column>
                <Column field="price" header="Price" sortable body= { priceBodyTemplate}></Column>
                <Column field="status" header="Status" sortable body= { statusBodyTemplate }></Column>
                <Column body={ actionBodyTemplate }></Column>
            </DataTable>

            <Dialog visible={planDialog} style ={{width: '350px' }} header="Plan" modal className="p-fluid" footer={ dialogFooter } onHide={ hideDialog } >
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={ plan?.name } onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !plan?.name })} />
                    { submitted && !plan?.name && <small className="p-invalid">Name is required.</small> }
                </div>
                <div className="p-field">
                    <label htmlFor="desc">Description</label>
                    <InputText id="desc" value={ plan?.desc } onChange={(e) => onInputChange(e, 'desc')} required autoFocus className={classNames({ 'p-invalid': submitted && !plan?.desc })} />
                    { submitted && !plan?.desc && <small className="p-invalid">Description is required.</small> }
                </div>
                <div className="p-field">
                    <label htmlFor="members_number">N° Members</label>
                    <InputNumber id="members_number" value={ plan?.members_number } onChange={(e) => onInputChange(e, 'members_number')} required autoFocus className={classNames({ 'p-invalid': submitted && !plan?.members_number })} />
                    { submitted && !plan?.members_number && <small className="p-invalid">N° members is required.</small> }
                </div>
                <div className="p-field">
                    <label htmlFor="discount">Discount</label>
                    <InputNumber id="discount" value={ plan?.discount } onChange={(e) => onInputChange(e, 'discount')} required autoFocus className={classNames({ 'p-invalid': submitted && !plan?.discount })} mode="decimal" />
                    { submitted && !plan?.discount && <small className="p-invalid">Discount is required.</small> }
                </div>
                <div className="p-field">
                    <label htmlFor="price">Price</label>
                    <InputNumber id="price" value={ plan?.price } onChange={(e) => onInputChange(e, 'price')} required autoFocus className={classNames({ 'p-invalid': submitted && !plan?.price })} mode="decimal" />
                    { submitted && !plan?.price && <small className="p-invalid">Price is required.</small> }
                </div>
                <div className="p-field">
                  <label htmlFor = "status" className="p-mr-2" >Status</label>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <InputSwitch id="status" className="p-mr-2" checked={switchValue} onChange={(e) => setSwitchValue(e.value)} autoFocus />
                    <i>{(switchValue) ? 'Active':'Inactive'}</i>
                  </div>
                </div>
            </Dialog>

            <Dialog visible={deletePlanDialog} style ={{width:'450px'}} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeletePlanDialog}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize:'2rem'}}/>
                {plan && <span>Are you sure you want to delete <b>{plan?.name}</b></span>}
              </div>
            </Dialog>
            <Dialog visible={deletePlansDialog} style={{width:'450px'}} header="Confirm" modal footer={deletePlansDialog} onHide={hideDeletePlansDialog}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize:'2rem'}}/>
                {plan && <span>Are you sure you want to delete the selected plans?</span>}
              </div>
            </Dialog>
            <Dialog visible = {planfDialog} style={{width:'450px'}} header="Confirm" modal footer={editPlanf} onHide={hideViewPlanfDialog}>
              <div className="p-field">
                {
                  !!planf && planf.map((d) => (d.item_description))
                }
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
};

Plan.propTypes ={

}
export default Plan;
