import * as actions from '../actions/repository.action';

const {handleActions} = require('redux-actions');

const initialState ={
    loading:false,
    data:null,
    error:null,
    loadingCreate:false,
    dataCreate:null,
    errorCreate:null,
};

export const RepositoryReducer = handleActions(
    {
        [actions.setLoadingRepositoryAction]: (state,{payload}) =>({
            ...state,
            loading:payload
        }),
        [actions.setRepositoryDataAction]: (state,{payload}) =>({
            ...state,
            data:payload
        }),
        [actions.setRepositoryErrorAction]: (state,{payload}) =>({
            ...state,
            error:payload
        }),
        [actions.setLoadingCreateRepositoryAction]: (state,{payload}) =>({
            ...state,
            loadingCreate:payload
        }),
        [actions.setRepositoryCreateDataAction]: (state,{payload}) =>({
            ...state,
            dataCreate:payload
        }),
        [actions.setRepositoryCreateErrorAction]: (state,{payload}) =>({
            ...state,
            errorCreate:payload
        }),
        

    },
    initialState,
);
