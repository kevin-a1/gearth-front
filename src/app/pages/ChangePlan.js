import React, { useState,useEffect } from 'react';
import { dplans } from '../../api/data';
import { Button } from 'primereact/button';
import { usePlan } from '../../redux/hooks/usePlan';

export const ChangePlan = () =>{
  const [plan, setPlan] = useState(dplans)
  const {listPlans,plansData} = usePlan();

  useEffect(()=>{

    listPlans();
    //setPlans(dplans)
  },[]);



  return (
    <>
    <div className="p-col-12">
        <div className="p-grid" style={{ margin: '-1rem' }} >
        {
            plansData?.map( p =>{
              return<div className="p-col">
                       <div className="card overview-box blue">
                          <div style={{textAlign:'center'}} className="overview-info">
                            <h1>{p?.name}</h1>
                            <h3>{p?.price}</h3>
                            <ul>{p?.desc} </ul>
                            <Button label="Elegir" className="p-button-success p-mr-2 p-mb-2 p-ml-2"/>
                          </div>
                      </div>
                    </div>
            })
        }
        </div>
    </div>
    </>
  );
};

export default ChangePlan;
