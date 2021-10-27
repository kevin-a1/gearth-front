import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";

import * as surveyActions from '../../../../redux/actions/survey.actions';
import '../../../assets/scss/modelos.scss';
import surveyImg from '../../../assets/img/survey.svg';
import bin from '../../../assets/img/bin.png';
import editarImg from '../../../assets/img/editarImg.png';
import { useHistory, useLocation } from 'react-router-dom';
import { size } from 'lodash';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import {Toast} from 'primereact/toast';


function Poll(props){

  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.LoginState.data);
  const [ polls, setPolls ] = useState([]);
  const [ loadingPolls, setLoadingPolls ] = useState(true);
  const [ layout, setLayout ] = useState('grid');
  const [ globalFilter, setGlobalFilter] = useState([]);
  const [ search, setSearch] = useState();
  const [ pollId, setPollId ] = useState("");
  const [ dialog, setDialog ] = useState(false);
  const toast = useRef(null);

  const loadSurveys = async () =>{
    try {
      setPolls(await surveyActions.getSurveyByProcess(props.processId, user.access_token));
      setLoadingPolls(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSurvey = async() =>{
    try {
      let code = surveyActions.deleteSurvey(pollId, user.access_token);
      console.log(code);
      if (code === 200) {
        loadSurveys();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Survey Deleted!', life: 3000 });
      }else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error!', life: 3000 });
      }
      setDialog(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    if(props.processId === undefined){
      console.log('No hay el id del Proceso');
    }else {
      loadSurveys();
    }
  }, [props.processId]);


  useEffect( async ()=>{
    if (pollId !== "") {
      setDialog(true);
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

  const headerDialogHeader = () => {
      return (
          <>
              <span className="p-d-block p-text-center" >
                  Choose an option
              </span>
          </>
      );
  };

  const confirmationDialogFooter = (
      <>
          <Button
              className="p-button-text p-button-danger"
              type="button" label="Cancel"
              onClick={() => close()} />
      </>
  );

  const close = () =>{
    setDialog(false);
    setPollId('');
  };

  const edit = async(v) =>{
    if (v) {
      console.log(pollId);
      let data = await surveyActions.getSurveyById(pollId, user.access_token);
      console.log(data);
      history.push({
        pathname:'/admin/survey/edit',
        state:{
          poll:data,
        },
      });
    };
  }

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
    <Toast ref={toast}/>
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
      <div>
      <Dialog
          header={ headerDialogHeader } visible={ dialog }
          onHide={() => close()}
          style={{ width: '340px' }} modal
          footer={ confirmationDialogFooter }>

          <div className="p-text-center">
              <div className="p-d-inline p-m-1">
                  <Button className="p-button-primary" iconPos="bottom" label="Edit" onClick={() => edit(true)}>
                      <img className="p-button-icon p-pt-1" src={ editarImg } style={{ width: '50px' }} />
                  </Button>
              </div>

              <div className="p-d-inline p-m-1">
                  <Button className="p-button-danger" iconPos="bottom" label="Delete" onClick={() => deleteSurvey()}>
                      <img className="p-button-icon p-pt-1" src={ bin } style={{ width: '50px' }} />
                  </Button>
              </div>
          </div>
      </Dialog>
      </div>
    </div>
  )
};
export default Poll;
