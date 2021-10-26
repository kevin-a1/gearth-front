import { createAction } from 'redux-actions';
import api from "../../api";
import * as urls from  '../../api/urls';

export const setLoadingPlanAction = createAction('SET_LOADING_PLAN_ACTION');
export const setPlanDataAction = createAction('SET_PLAN_DATA_ACTION');
export const setPlanErrorAction = createAction('SET_PLAN_ERROR_ACTION');
export const setResetPlanAction = createAction('SET_RESET_PLAN_ACTION');


export const setLoadingCreatePlanAction = createAction('SET_LOADING_CREATE_PLAN_ACTION');
export const setPlanCreateDataAction = createAction('SET_PLAN_CREATE_DATA_ACTION');
export const setPlanCreateErrorAction = createAction('SET_PLAN_CREATE_ERROR_ACTION');
export const setResetCreatePlanAction = createAction('SET_RESET_CREATE_PLAN_ACTION');


export const getPlans = (history) => async (dispatch,getState) =>{


    dispatch(setResetPlanAction());
    dispatch(setLoadingPlanAction(true));

    try{
        const token = getState()?.LoginState?.data?.access_token;
        const {data, status} = await api.get(urls.urlListPlans, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });


        if(status === 200){
            dispatch(setPlanDataAction(data));
            dispatch(
                setPlanErrorAction({
                    message:"Exito"
                })
            );
        }
        else if(status === 403){
            console.log("FORBIDEEEN");
            history.push('/access');
        }
       

    }
    catch(error){
        console.log(error);
        dispatch(
            setPlanErrorAction({
                message:"Error al recuperar información"
            })
        );

    }

    dispatch(setLoadingPlanAction(false));
};


export const createPlan = (data,history) =>async (dispatch,getState)=>{

    const token = getState()?.LoginState?.data?.access_token;


    dispatch(setResetCreatePlanAction());
    dispatch(setLoadingCreatePlanAction(false));
    try{

        const {data, status} = await api.post(urls.urlListPlans, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });

        if(status === 200){
            dispatch(setPlanDataAction(data));
            dispatch(
                setPlanErrorAction({
                    message:"Exito"
                })
            );
        }

    }
    catch(error){
        dispatch(
            setPlanErrorAction({
                message:"Error al recuperar información"
            })
        );

    }

    dispatch(setLoadingPlanAction(false));

};
