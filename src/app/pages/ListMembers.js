import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useLogin } from '../../redux/hooks/useUser';
import { people } from '../../api/data';

export const ListMembers = () =>{
  const {data} = useLogin();

  const [user, setUser] = useState(data);

  const [person, setPerson] = useState(people);
  const [customer1, setCustomer1] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [selectedCustomers2, setSelectedCustomers2] = useState(null);
  const [globalFilter1, setGlobalFilter1] = useState('');
  const [globalFilter2, setGlobalFilter2] = useState('');
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [floatValue, setFloatValue] = useState('');

  const op = useRef(null);


  const toggle = (event) => {
      op.current.toggle(event);
  };
  const newMember = () =>{
    return (
      <React.Fragment>
          <Button label="Add Member" icon="pi pi-user-plus" className="p-mr-2 p-mb-2" onClick={toggle}></Button>
          <OverlayPanel  ref = {op} appendTo={document.body} showCloseIcon style={{ width: '450px' }}>
            <br/>
            <div style={{display:'flex', verticalAlign:'middle',justifyContent: 'center'}}>
            <span className="p-float-label">
                <InputText id="Email" type="text" value={floatValue} onChange={(e) => setFloatValue(e.target.value)} />
                <label htmlFor="Email">Email</label>&nbsp;
            </span>
              <Button label="Send Invitation" className="p-button-success p-mr-2 p-mb-2 p-ml-2"/>
            </div>
            <br/>
            <DataTable value={customer1} paginator className="p-datatable-customers" rows={10} dataKey="id" rowHover selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                emptyMessage="No customers found." loading={loading2}>
                <Column field="User" header="User" sortable body={bodyTemplate}></Column>
                <Column field="Email" header="Email" sortable body={statusBodyTemplate}></Column>
                <Column headerStyle={{ width: '8rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible', justifyContent: 'center' }} body={actionTemplate}></Column>
            </DataTable>
          </OverlayPanel>
      </React.Fragment>
    );
  };

  const customer1TableHeader = (
      <div className="table-header">
          <h5>Members List</h5>
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilter1} onChange={(e) => setGlobalFilter1(e.target.value)} placeholder="Global Search" />
          </span>
      </div>
  );
  useEffect(()=>{
    if(person.length > 0){
      setLoading1(false);
    }
  },[]);
  const bodyTemplate = (data, props) => {
      return (
          <>
              <span className="p-column-title">{props.header}</span>
              {data[props.field]}
          </>
      );
  };
  const menuText = () =>{
    return (
        <React.Fragment>
          <h4>Equipo de trabajo de GEArth</h4>
        </React.Fragment>
    );
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

  const actionTemplate = () => <Button icon="pi pi-cog" className="p-button-rounded " tooltip="Settings"/>;

  return (
    <div className="p-grid table-demo">
        <div className="p-col-12">
            <div className="card">
                <Toolbar className="p-mb-4 p-toolbar" left ={menuText} right={newMember}></Toolbar>
                <DataTable value={person} paginator className="p-datatable-customers" rows={10} dataKey="id" rowHover selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    globalFilter={globalFilter1} emptyMessage="No members found." loading={loading1} header={customer1TableHeader}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="lname" header="Last Name" sortable></Column>
                    <Column field="identification" header="Identification" sortable ></Column>
                    <Column field="gender" header="Gender" sortable></Column>
                    <Column field="status" header="Status" sortable body={ statusBodyTemplate } ></Column>
                    <Column headerStyle={{ width: '8rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible', justifyContent: 'center' }} body={actionTemplate}></Column>
                </DataTable>
            </div>
          </div>
      </div>
    )
  }

export default ListMembers;
