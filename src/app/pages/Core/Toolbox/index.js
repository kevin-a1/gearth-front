import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { herramientas } from '../../../../api/data';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import '../../../assets/scss/modelos.scss';
import { Toolbar } from 'primereact/toolbar';
import { useHistory } from 'react-router-dom';
import { useToolbox } from '../../../../redux/hooks/useToolbox';


const Toolbox = () =>{
  const [modelo, setModelo] = useState(null);
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [globalFilter, setGlobalFilter] = useState([]);
  const history = useHistory();
  const {listTools,toolboxData}= useToolbox();

  useEffect(() =>{
    listTools()
    setModelo(herramientas);
  },[]);

  const onFilterOptions =[
    {label:'Category', value:'category'},
    {label:'Update date', value:'name'},
    {label:'Trending models', value:'!name'},
  ];

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

  const onClickTool =(tool_id) =>{
    //history.push(`./toolbox/tools?action=edit&tool_id=${tool_id}`);
    history.push(`./toolbox/view?tool_id=${tool_id}`);
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
      <div className=" cardif p-col-12" onClick={()=>onClickTool(data?.id)} style={{cursor:"pointer"}}>
      <div className="product-list-item">
          <img src={data?.image} alt={data?.name} />
          <div className="product-list-detail">
              <div className="product-name">{data?.name}</div>
              <div className="product-description" dangerouslySetInnerHTML={{__html:data?.description}}></div>
         
          </div>
      </div>
      </div>
    );
  };


  const dataviewGridItem = (data) => {
      return (
          <div className =" p-col-12 p-md-4" onClick={()=>onClickTool(data?.id)} style={{cursor:"pointer"}}>
              <div className=" cardif product-grid-item card">
                  <div className="p-dataview-header" style={{display:'flex', verticalAlign:'middle',justifyContent: 'center'}}>
                  <img src={data?.image} alt={data?.name} />
                  </div>
                  <div className="product-grid-item-content ">
                  <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.keywords}</span>
                    
                      <div className="product-name">{data.name}</div>
                      <div className="product-description"dangerouslySetInnerHTML={{__html:data?.description}}></div>
                      
                  </div>
              </div>
          </div>
      );
  };
  const itemTemplate = (data, layout) =>{
    if(!data){
      return;

    }

    if(layout === 'list'){
      return dataviewModelos(data);
    }else if (layout === 'grid') {
      return dataviewGridItem(data);
    }
  };

  const onClickNew =()=>{
    history.push("./toolbox/tools?action=new");
  }
  const leftToolbarTemplate = () => {
    return (
     
      <>
      <Button label="Nuevo" icon="pi pi-check" className="p-button-alert" onClick={onClickNew} />
  </>
       
    )
}

const rightToolbarTemplate = () => {
    return (
        <>
            <Button label="Exportar" icon="pi pi-upload" className="p-button-help"  />
        </>
    )
}


  return (
    <>
    <div className="p-col-12">
        <div className="card">
            <div style={{ textAlign: 'left' }}>
            

                <div className="p-col-12 p-md-6">
                    <div className="p-inputgroup">
                        <Button label="Buscar" />
                        <InputText type="search" placeholder="Ingrese su búsqueda..." onInput={(e) => setGlobalFilter(e.target.value)}/>
                    </div>
                    
                </div>
                <br/>
                <Toolbar className="p-mb-4 p-toolbar" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar>

            </div>
        </div>
    </div>
    <div className="list-demo">
      <div className="p-col-12">
      <div className="card">
          <h2>Caja de Herramientas de GEArth</h2>
          {
            !!toolboxData && clasificador(toolboxData).map( d =>{
              let data = toolboxData?.filter(x => x.category === d)
              return(
                <>
                
                <DataView globalFilter={ globalFilter } value={data} layout={layout} paginator rows={6} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
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



export default Toolbox;
