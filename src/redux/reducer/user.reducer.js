import * as actions from '../actions/user.action';

const {handleActions} = require('redux-actions');

const initialState ={
    loading:false,
    data:null,
    error:null,
    login:false
};

export const LoginReducer = handleActions(
    {
        [actions.setLoadingLoginAction]: (state,{payload}) =>({
            ...state,
            loading:payload
        }),
        [actions.setLoginDataAction]: (state,{payload}) =>({
            ...state,
            data:payload
        }),
        [actions.setLoginErrorAction]: (state,{payload}) =>({
            ...state,
            error:payload
        }),
        [actions.setIsLogedIn]: (state,{payload}) =>({
            ...state,
            login:payload
        }),

    },
    initialState,
);
