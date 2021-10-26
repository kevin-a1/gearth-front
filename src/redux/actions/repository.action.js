import { createAction } from 'redux-actions';
import api from "../../api";
import * as urls from  '../../api/urls';

export const setLoadingRepositoryAction = createAction('SET_LOADING_REPOSITORY_ACTION');
export const setRepositoryDataAction = createAction('SET_REPOSITORY_DATA_ACTION');
export const setRepositoryErrorAction = createAction('SET_REPOSITORY_ERROR_ACTION');
export const setResetRepositoryAction = createAction('SET_RESET_REPOSITORY_ACTION');


export const setLoadingCreateRepositoryAction = createAction('SET_LOADING_CREATE_REPOSITORY_ACTION');
export const setRepositoryCreateDataAction = createAction('SET_REPOSITORY_CREATE_DATA_ACTION');
export const setRepositoryCreateErrorAction = createAction('SET_REPOSITORY_CREATE_ERROR_ACTION');
export const setResetCreateRepositoryAction = createAction('SET_RESET_CREATE_REPOSITORY_ACTION');


export const getRepositories = (history) => async (dispatch,getState) =>{


    dispatch(setResetRepositoryAction());
    dispatch(setLoadingRepositoryAction(true));

    try{
        const token = getState()?.LoginState?.data?.access_token;
        const {data, status} = await api.get(urls.urlListRepositories, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });


        if(status === 200){
            dispatch(setRepositoryDataAction(data));
            dispatch(
                setRepositoryErrorAction({
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
            setRepositoryErrorAction({
                message:"Error al recuperar información"
            })
        );

    }

    dispatch(setLoadingRepositoryAction(false));
};


export const createRepository = (data) =>async (dispatch,getState)=>{

    const token = getState()?.LoginState?.data?.access_token;
    const dataCreate = {
        name:data?.name,
        description:data?.description,
        long_description: data?.long_description
    }

    dispatch(setResetCreateRepositoryAction());
    dispatch(setLoadingCreateRepositoryAction(false));
    try{

        const {data, status} = await api.post(urls.urlCreateRepositories,dataCreate, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });

        if(status === 200){
            dispatch(setRepositoryDataAction(data));
            dispatch(
                setRepositoryErrorAction({
                    message:"Exito"
                })
            );
        }

    }
    catch(error){
        dispatch(
            setRepositoryErrorAction({
                message:"Error al recuperar información"
            })
        );

    }

    dispatch(setLoadingCreateRepositoryAction(false));

};
