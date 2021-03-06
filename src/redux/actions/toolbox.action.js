import { createAction } from 'redux-actions';
import api from "../../api";
import * as urls from  '../../api/urls';
import { uploadImages } from './generics.action';

export const setLoadingToolAction = createAction('SET_LOADING_TOOL_ACTION');
export const setToolDataAction = createAction('SET_TOOL_DATA_ACTION');
export const setToolErrorAction = createAction('SET_TOOL_ERROR_ACTION');
export const setResetToolAction = createAction('SET_RESET_TOOL_ACTION');


export const setLoadingCurrentToolAction = createAction('SET_LOADING_CURRENT_TOOL_ACTION');
export const setCurrentToolDataAction = createAction('SET_CURRENT_TOOL_DATA_ACTION');
export const setCurrentToolErrorAction = createAction('SET_CURRENT_TOOL_ERROR_ACTION');
export const setResetCurrentToolAction = createAction('SET_RESET_CURRENT_TOOL_ACTION');


export const setLoadingDistinctToolAction = createAction('SET_LOADING_DISTINCT_TOOL_ACTION');
export const setDistinctToolDataAction = createAction('SET_DISTINCT_TOOL_DATA_ACTION');
export const setDistinctToolErrorAction = createAction('SET_DISTINCT_TOOL_ERROR_ACTION');
export const setResetDistinctToolAction = createAction('SET_RESET_DISTINCT_TOOL_ACTION');


export const setLoadingComplementaryToolAction = createAction('SET_LOADING_COMPLEMENTARY_TOOL_ACTION');
export const setComplementaryToolDataAction = createAction('SET_COMPLEMENTARY_TOOL_DATA_ACTION');
export const setComplementaryToolErrorAction = createAction('SET_COMPLEMENTARY_TOOL_ERROR_ACTION');
export const setResetComplementaryToolAction = createAction('SET_RESET_COMPLEMENTARY_TOOL_ACTION');


export const setLoadingCreateToolAction = createAction('SET_LOADING_CREATE_TOOL_ACTION');
export const setToolCreateDataAction = createAction('SET_TOOL_CREATE_DATA_ACTION');
export const setToolCreateErrorAction = createAction('SET_TOOL_CREATE_ERROR_ACTION');
export const setResetCreateToolAction = createAction('SET_RESET_CREATE_TOOL_ACTION');


export const getTools = (history) => async (dispatch,getState) =>{


    dispatch(setResetToolAction());
    dispatch(setLoadingToolAction(true));

    try{
        const token = getState()?.LoginState?.data?.access_token;
        const {data, status} = await api.get(urls.urlListTools, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });


        if(status === 200){
            dispatch(setToolDataAction(data));
            dispatch(
                setToolErrorAction({
                    message:null
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
            setToolErrorAction({
                message:"Error al recuperar informaci??n"
            })
        );

    }

    dispatch(setLoadingToolAction(false));
};


export const getToolsDistinct = (history, tool_id) => async (dispatch,getState) =>{


    dispatch(setResetDistinctToolAction());
    dispatch(setLoadingDistinctToolAction(true));

    try{
        const token = getState()?.LoginState?.data?.access_token;
        const {data, status} = await api.get(`${urls.urlListDistinctTools}/${tool_id}`, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });


        if(status === 200){
            dispatch(setDistinctToolDataAction(data));
            dispatch(
                setDistinctToolErrorAction({
                    message:null
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
            setDistinctToolErrorAction({
                message:"Error al recuperar informaci??n"
            })
        );

    }

    dispatch(setLoadingDistinctToolAction(false));
};


export const getToolById = (history,tool_id) => async (dispatch,getState) =>{


    dispatch(setResetCurrentToolAction());
    dispatch(setLoadingCurrentToolAction(true));

    try{
        const token = getState()?.LoginState?.data?.access_token;
        const {data, status} = await api.get(`${urls.urlListTools}/${tool_id}`, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });


        if(status === 200){
            dispatch(setCurrentToolDataAction(data));
            dispatch(
                setCurrentToolErrorAction({
                    message:null
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
            setCurrentToolErrorAction({
                message:"Error al recuperar informaci??n"
            })
        );

    }

    dispatch(setLoadingCurrentToolAction(false));
};


export const createTool = (data) =>async (dispatch,getState)=>{

    const token = getState()?.LoginState?.data?.access_token;
    let dataCreate = {
        name:data?.name,
        keywords:data?.keywords,
        origins: data?.origins,
        url:data?.url,
        description:data?.description,
        folder:"toolbox",
        team_id:0,
        type:2,
        dataImage:data?.dataImage
    }

    dispatch(setResetCurrentToolAction());
    dispatch(setLoadingCurrentToolAction(false));
    try{

        const {data, status} = await api.post(urls.urlCreateTool,dataCreate, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });

        if(status === 200){
            dispatch(setCurrentToolDataAction(data));
            dispatch(
                setCurrentToolErrorAction({
                    message:null
                })
            );
            dataCreate.type_id=data?.id
            dispatch(uploadImages(dataCreate))
        }

    }
    catch(error){
        dispatch(
            setCurrentToolErrorAction({
                message:"Error al recuperar informaci??n"
            })
        );

    }

    dispatch(setLoadingCurrentToolAction(false));

};



export const createToolAditionalData = (data) =>async (dispatch,getState)=>{

    const token = getState()?.LoginState?.data?.access_token;
    const{opcion,id} = data;
    let dataCreate = {
        id: id,
    }
    let url = "";

    if(opcion === "theory"){
        dataCreate.theory =  data?.theory;
        url = urls.urlCreateToolTheory;

    }
    else if(opcion==="method"){
        dataCreate.method =  data?.method;
        url = urls.urlCreateToolMethod;
    }
    else if(opcion === "use"){
        dataCreate.use =  data?.use;
        url = urls.urlCreateToolUse;
    }
    else{
        dataCreate.changes =  data?.changes;
        url = urls.urlCreateToolChanges;
    }


    dispatch(setResetCurrentToolAction());
    dispatch(setLoadingCurrentToolAction(false));
    try{

        const {data, status} = await api.put(url,dataCreate, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });

        if(status === 200){
            dispatch(setCurrentToolDataAction(data));
            dispatch(
                setCurrentToolErrorAction({
                    message:null
                })
            );
        }

    }
    catch(error){
        dispatch(
            setCurrentToolErrorAction({
                message:"Error al recuperar informaci??n"
            })
        );

    }

    dispatch(setLoadingCurrentToolAction(false));

};



export const createComplementaryTool = (data) =>async (dispatch,getState)=>{

    const token = getState()?.LoginState?.data?.access_token;
    const dataCreate = {
        tool_id: data.tool_id,
        related_tool_id: data.related_tool_id
    }

    dispatch(setResetComplementaryToolAction());
    dispatch(setLoadingComplementaryToolAction(false));
    try{

        const {data, status} = await api.post(urls.urlCreateComplementaryTool,dataCreate, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           });

        if(status === 200){
            dispatch(setComplementaryToolDataAction(data));
            dispatch(
                setComplementaryToolErrorAction({
                    message:null
                })
            );
        }

    }
    catch(error){
        dispatch(
            setComplementaryToolErrorAction({
                message:"Error al recuperar informaci??n"
            })
        );

    }

    dispatch(setLoadingComplementaryToolAction(false));

};

export const cleanTool = () =>async (dispatch,getState)=>{


    dispatch(setResetCurrentToolAction());
    dispatch(setLoadingCurrentToolAction(false));
    dispatch(setCurrentToolDataAction({}));
    dispatch(
        setCurrentToolErrorAction(null)
    );

};