import React, {useState, useEffect} from 'react';

import { findPollsByProcess, findPollsById } from '../../../../api/data';
import '../../../assets/scss/modelos.scss';
import surveyImg from '../../../assets/img/survey.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { size } from 'lodash';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';


function Poll(props){

  const history = useHistory();
  const location = useLocation();
  const [ polls, setPolls ] = useState([]);
  const [ loadingPolls, setLoadingPolls ] = useState(true);
  const [ layout, setLayout ] = useState('grid');
  const [ globalFilter, setGlobalFilter] = useState([]);
  const [ search, setSearch] = useState();
  const [ pollId, setPollId ] = useState(0);

  useEffect(()=>{
    if(props.processId === undefined){
      console.log('No hay el id del Proceso');
    }else {
      const datas = findPollsByProcess(props.processId);
      console.log(datas);
      setPolls(datas);
      setLoadingPolls(false)
      console.log(polls);
    }
  }, [props.modelId]);

  useEffect(()=>{
    if (pollId > 0) {
      console.log(pollId);
      let data = findPollsById(pollId);
      history.push({
        pathname:'/admin/survey/edit',
        state:{
          poll:data,
        },
      });
    };
  });

  const searchPoll = (text) => {
    if(text){
      const newData = polls.filter(function(item){
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setGlobalFilter(newData);
      setSearch(text)
    }else {
      setGlobalFilter(polls);
      setSearch(text);
    }
  };


  const dataviewHeader = (
      <div className="p-grid p-nogutter">
          <div className="p-col-12 p-md-6">
              <div className="p-inputgroup">
                  <Button label="Search" />
                  <InputText type="search" placeholder="Search..." onInput={(e) => searchPoll(e.target.value)}/>
              </div>
          </div>
          <div className="p-col-6" style={{ textAlign: 'right' }}>
              <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
          </div>
      </div>
  );

  const dataviewModelos = (data) =>{
    return (
      <div className=" cardif p-col-12" onClick={()=> setPollId(data.id)}>
      <div className="product-list-item">
          <img src={surveyImg} alt={data.name} style={{ width: '100px' }}/>
          <div className="product-list-detail">
              <div className="product-name">{data.name}</div>
              <div className="product-description">{data.description}</div>
          </div>
      </div>
      </div>
    );
  };


  const dataviewGridItem = (data) => {
      return (
          <div className =" p-col-12 p-md-3" onClick={()=> setPollId(data.id)}>
              <div className=" cardif product-grid-item card">
                  <div className="p-dataview-header" style={{display:'flex', verticalAlign:'middle',justifyContent: 'center'}}>
                  <img src={surveyImg} alt={data.name} style={{ width: '100px'}}/>
                  </div>
                  <div className="product-grid-item-content ">
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

    if(layout === 'list'){
      return dataviewModelos(data);
    }else if (layout === 'grid') {
      return dataviewGridItem(data);
    }
  };

  return(
    <div>
      <div>
        {loadingPolls ? (<h4>This process does not have surveys</h4>):''}
        {size(globalFilter) >= 0?(
          <>
          <DataView  value={polls} layout={layout} paginator rows={4} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
          <br/>
          </>
        ):(
          <h4>The requested survey does not exist</h4>
        )
        }
      </div>
    </div>
  )
};
export default Poll;
