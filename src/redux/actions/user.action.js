import { createAction } from 'redux-actions';
import api from "../../api";
import axios from "axios";
import * as urls from  '../../api/urls';

export const setLoadingLoginAction = createAction('SET_LOADING_LOGIN_ACTION');
export const setLoginDataAction = createAction('SET_LOGIN_DATA_ACTION');
export const setLoginErrorAction = createAction('SET_LOGIN_ERROR_ACTION');
export const setIsLogedIn = createAction('IS_LOGED_IN');
export const setResetLoginAction = createAction('SET_RESET_LOGIN_ACTION');

export const iniciarSesion = (datosLogin) => async (dispatch,getState) =>{

    const{username,password} = datosLogin;

    const datos ={
        username:username,
        password:password,
        app: "web",
    };


    dispatch(setResetLoginAction());
    dispatch(setLoadingLoginAction(true));

    try{

        const {data, status} = await api.post(`${urls.URL_BASE}${urls.urlLogin}`, datos)

        if(status === 200){
            dispatch(setLoginDataAction(data));
            dispatch(setIsLogedIn(true));
            dispatch(
                setLoginErrorAction({
                    message:"Exito"
                })
            );
        } else {
            console.log(data);
        }

    }
    catch(error){
        dispatch(
            setLoginErrorAction({
                message:"Error al iniciar sesión"
            })
        );

    }

    dispatch(setLoadingLoginAction(false));
};


export const finalizarSesion = (props) =>async (dispatch,getState)=>{




    dispatch(setResetLoginAction());
    dispatch(setLoadingLoginAction(false));
    try{

            dispatch(setIsLogedIn(false));
            dispatch(setLoginDataAction({
                
            }));
            dispatch(
                setLoginErrorAction(null)
            );

            props.history.push('/login');

    }
    catch(error){

    }

};

export const registrarUsuario = (data) => {

    const USER_DATA = {
        username: data?.username,
        names: data?.names,
        last_names: data?.lnames,
        identification: data?.id,
        gender: data?.gender,
        password: data?.password,
        description: data?.desc,
        team_name: data?.team,
        plan_id: 1,
        role_id: 1,
    }

    console.log(USER_DATA);

    return new Promise(function (resolve, reject) {

        axios.post(`${urls.URL_BASE}${urls.urlRegister}`, USER_DATA).then(
            response => {
                var result = response.data;
                resolve(result);
            }, error => {
                reject(error);
            }
        );

    });
}