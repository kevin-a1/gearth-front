import { createAction } from 'redux-actions';
import api from "../../api";
import * as urls from  '../../api/urls';


export const setLoadingImageAction = createAction('SET_LOADING_IMAGE_ACTION');
export const setImageDataAction = createAction('SET_IMAGE_DATA_ACTION');
export const setImageErrorAction = createAction('SET_IMAGE_ERROR_ACTION');
export const setResetImageAction = createAction('SET_RESET_IMAGE_ACTION');






export const uploadImages = (data) =>async (dispatch,getState)=>{

    const token = getState()?.LoginState?.data?.access_token;
    const{folder,team_id,type,type_id,dataImage} = data;
    let formData = new FormData();
    formData.append('file_obj', dataImage);
    console.log(dataImage);

    dispatch(setResetImageAction());
    dispatch(setLoadingImageAction(false));
    
    try{
        const {data, status} = await api.post(`${urls.URL_BASE}uploads?folder=${folder}&team_id=${team_id}&type=${type}&type_id=${type_id}`,formData, {
            headers: {
              Authorization: 'Bearer ' + token, //the token is a variable which holds the token,
              ContentType: "multipart/form-data"
            }
           });

        if(status === 200){
            dispatch(setImageDataAction(data));
            dispatch(
                setImageErrorAction({
                    message:"Exito"
                })
            );
        }

    }
    catch(error){
        dispatch(
            setImageErrorAction({
                message:"Error al cargar imagen"
            })
        );

    }

    dispatch(setLoadingImageAction(false));

};
