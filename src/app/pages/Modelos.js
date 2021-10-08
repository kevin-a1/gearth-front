import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { modelos } from '../../api/data';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import '../assets/scss/modelos.scss';

const Modelos = () =>{
  const [modelo, setModelo] = useState(null);
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [globalFilter, setGlobalFilter] = useState([]);

  useEffect(() =>{
    setModelo(modelos);
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

  const prueba =() =>{
    return(
      alert("Modelo")
    )
  };


  const dataviewHeader = (
      <div className="p-grid p-nogutter">
          <div className="p-col-6" style={{ textAlign: 'left' }}>
              <Dropdown value={sortKey} options={onFilterOptions} optionLabel="label" placeholder="Order by ..." onChange={onSortChange} />
          </div>
          <div className="p-col-6" style={{ textAlign: 'right' }}>
              <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
          </div>
      </div>
  );
  const dataviewModelos = (data) =>{
    return (
      <div className=" cardif p-col-12" onClick={prueba}>
      <div className="product-list-item">
          <img src={data.img} alt={data.name} style={{ width: '100px' }}/>
          <div className="product-list-detail">
              <div className="product-name">{data.name}</div>
              <div className="product-description">{data.desc_short}</div>
              <Rating value={data.qualification} readonly cancel={false}></Rating>
              <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
          </div>
      </div>
      </div>
    );
  };


  const dataviewGridItem = (data) => {
      return (
          <div className =" p-col-12 p-md-4" onClick={prueba}>
              <div className=" cardif product-grid-item card">
                  <div className="p-dataview-header" style={{display:'flex', verticalAlign:'middle',justifyContent: 'center'}}>
                  <img src={data.img} alt={data.name} style={{ width: '100px'}}/>
                  </div>
                  <div className="product-grid-item-content ">
                      <i className="pi pi-tag product-category-icon"></i>
                      <span className="product-category">{data.category}</span>
                      <div className="product-name">{data.name}</div>
                      <div className="product-description">{data.desc_short}</div>
                      <Rating value={data.qualification} readonly cancel={false}></Rating>
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


  return (
    <>
    <div className="p-col-12">
        <div className="card">
            <div style={{ textAlign: 'left' }}>
                <h5>Set of Models</h5>
                <div className="p-col-12 p-md-6">
                    <div className="p-inputgroup">
                        <Button label="Search" />
                        <InputText type="search" placeholder="Search..." onInput={(e) => setGlobalFilter(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div style={{display:'flex', verticalAlign:'middle',justifyContent: 'center'}}>
                  <span>{
                    !!modelo && clasificador(modelo).map((d) => (
                        <Button label= {d} className="p-button-rounded p-mr-2 p-mb-2" />
                    ))
                  }</span>
                </div>
            </div>
        </div>
    </div>
    <div className="list-demo">
      <div className="p-col-12">
      <div className="card">
          <h5>Modelos</h5>
          {
            !!modelo && clasificador(modelo).map( d =>{
              let data = modelo.filter(x => x.category === d)
              return(
                <>
                <h5>{d}</h5>
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

Modelos.propTypes = {

};

export default Modelos;
