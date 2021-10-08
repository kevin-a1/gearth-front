import {useDispatch,useSelector} from 'react-redux';
import {finalizarSesion, iniciarSesion} from '../actions/user.action';

export const useLogin = () =>{

    const state = useSelector((state) => state.LoginState);
    const dispatch = useDispatch();

    const iniciaSesion = (datosLogin) =>{
        dispatch(iniciarSesion(datosLogin));
    }
    const finalizaSesion = () =>{
        dispatch(finalizarSesion());
    }

    return {
        ...state,
        iniciaSesion,
        finalizaSesion,
        idUsuario:state?.data?.id || 0,
        login:state?.login
    }
}