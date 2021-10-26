import * as actions from '../actions/toolbox.action';

const {handleActions} = require('redux-actions');

const initialState ={
    loading:false,
    data:null,
    error:null,
    loadingCreate:false,
    dataCreate:null,
    errorCreate:null,
    loadingCurrent:false,
    dataCurrent:null,
    errorCurrent:null,
    loadingDistinct:false,
    dataDistinct:null,
    errorDistinct:null
};

export const ToolboxReducer = handleActions(
    {
        [actions.setLoadingToolAction]: (state,{payload}) =>({
            ...state,
            loading:payload
        }),
        [actions.setToolDataAction]: (state,{payload}) =>({
            ...state,
            data:payload
        }),
        [actions.setToolErrorAction]: (state,{payload}) =>({
            ...state,
            error:payload
        }),


        [actions.setLoadingCreateToolAction]: (state,{payload}) =>({
            ...state,
            loadingCreate:payload
        }),
        [actions.setToolCreateDataAction]: (state,{payload}) =>({
            ...state,
            dataCreate:payload
        }),
        [actions.setToolCreateErrorAction]: (state,{payload}) =>({
            ...state,
            errorCreate:payload
        }),


        [actions.setLoadingCurrentToolAction]: (state,{payload}) =>({
            ...state,
            loadingCurrent:payload
        }),
        [actions.setCurrentToolDataAction]: (state,{payload}) =>({
            ...state,
            dataCurrent:payload
        }),
        [actions.setCurrentToolErrorAction]: (state,{payload}) =>({
            ...state,
            errorCurrent:payload
        }),


        [actions.setLoadingDistinctToolAction]: (state,{payload}) =>({
            ...state,
            loadingDistinct:payload
        }),
        [actions.setDistinctToolDataAction]: (state,{payload}) =>({
            ...state,
            dataDistinct:payload
        }),
        [actions.setDistinctToolErrorAction]: (state,{payload}) =>({
            ...state,
            errorDistinct:payload
        }),


        [actions.setLoadingComplementaryToolAction]: (state,{payload}) =>({
            ...state,
            loadingComplementary:payload
        }),
        [actions.setComplementaryToolDataAction]: (state,{payload}) =>({
            ...state,
            dataComplementary:payload
        }),
        [actions.setComplementaryToolErrorAction]: (state,{payload}) =>({
            ...state,
            errorComplementary:payload
        }),

    },
    initialState,
);
