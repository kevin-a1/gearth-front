import React, { useState, useEffect, useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { herramientas } from '../../../../../../api/data'
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import '../../../../../assets/scss/modelos.scss';
import { Toolbar } from 'primereact/toolbar';
import { useHistory } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Toast } from 'primereact/toast';
import { useToolbox } from '../../../../../../redux/hooks/useToolbox';


const ToolComplementaries = ({dataCurrent,action,tool_id}) =>{
  const [modelo, setModelo] = useState(null);
  const [globalFilter1, setGlobalFilter1] = useState('');
  const [selectedComplementaries, setSelectedComplementaries] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [globalFilter, setGlobalFilter] = useState([]);
  const history = useHistory();
  const op2 = useRef(null);
  const toast = useRef(null);
  const[dataTool,setDataTool] = useState({
    complementaries: action==="edit"?dataCurrent?.complementaries:[],
});
const{distinctTool,getDistinctTool,insertComplementaryTool} = useToolbox();

  useEffect(() =>{
    setModelo(herramientas);
    if(action==="edit"){
      getDistinctTool(tool_id)
    }
  },[]);

  const onFilterOptions =[
    {label:'Category', value:'category'},
    {label:'Update date', value:'name'},
    {label:'Trending models', value:'!name'},
  ];

  const toggleDataTable = (event) => {
    op2.current.toggle(event);
};
const onToolSelect = (event) => {
  op2.current.hide();
  console.log(`Herramienta seleccionada ${event.data.id}`);
  //Agregar herramienta
  //toast.current.show({ severity: 'info', summary: 'Product Selected', detail: event.data.name, life: 3000 });
};
  const onSortChange = (event) =>{
    const value = event.value;

    if(value.indexOf('!') === 0){
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    }else {
        setSortOrder(1);
        setSortField(value);
        setSortKey(value);
    }
  };

  const clasificador =(m)=>{
    let arr=[];
    m.map((d)=>{
      const { category } = d
      arr.push(category)
    })
    arr = arr.filter((item,index)=>{
      return arr.indexOf(item) === index;
    })

    return arr
  };

  const prueba =() =>{
    return(
      alert("Modelo")
    )
  };


  const dataviewHeader = (
      <div className="p-grid p-nogutter">
          <div className="p-col-6" style={{ textAlign: 'left' }}>
              <Dropdown value={sortKey} options={onFilterOptions} optionLabel="label" placeholder="Ordenar por ..." onChange={onSortChange} />
          </div>
          <div className="p-col-6" style={{ textAlign: 'right' }}>
              <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
          </div>
      </div>
  );
  const dataviewModelos = (data) =>{
    return (
      <div className=" cardif p-col-12">
      <div className="product-list-item">
          <img src={data.image} alt={data.name} />
          <div className="product-list-detail">
              <div className="product-name">{data.name}</div>
              <div className="product-description">{data.description}</div>
         
          </div>
      </div>
      </div>
    );
  };


  const itemTemplate = (data, layout) =>{
    if(!data){
      return;

    }

 
      return dataviewModelos(data);

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
const menuText = () =>{
    return (
        <React.Fragment>
          <h4>Caja de herramientas de GEArth</h4>
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

const{complementaries} = dataCurrent;

  return (
    <>
          <Button style={{ marginTop: 10 }} type="button" label="Ver todas las herramientas de GEArth" onClick={toggleDataTable} className="p-button-success" />
          <OverlayPanel ref={op2} appendTo={document.body} showCloseIcon id="overlay_panel" style={{ width: '800px' }}>
                                    <DataTable value={distinctTool} selection={selectedComplementaries} rowHover onSelectionChange={(e) => setSelectedComplementaries(e.value)} selectionMode="single"
                                        paginator rows={5} onRowSelect={onToolSelect}>
                                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="name" header="Nombre" sortable></Column>
                    <Column field="description" header="Descripción" sortable></Column>
                    <Column field="status" header="Status" sortable body={ statusBodyTemplate } ></Column>
                    <Column headerStyle={{ width: '8rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible', justifyContent: 'center' }} body={actionTemplate}></Column>
                                    </DataTable>
                                </OverlayPanel>
    
    <div className="list-demo">

      <div className="p-col-12">
      <div className="card">
          <h2>Herramientas Complementarias</h2>
          {
            !!complementaries && clasificador(complementaries).map( d =>{
              let data = complementaries?.filter(x => x.category === d)
              return(
                <>
                
                <DataView  value={data}  paginator rows={6}  itemTemplate={itemTemplate} ></DataView>
                <br/>
                </>
              )
            })
          }
      </div>
      </div>
    </div>
    </>
  )
};



export default ToolComplementaries;
