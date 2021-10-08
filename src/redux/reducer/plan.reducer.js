import * as actions from '../actions/plan.action';

const {handleActions} = require('redux-actions');

const initialState ={
    loading:false,
    data:null,
    error:null,
};

export const PlanReducer = handleActions(
    {
        [actions.setLoadingPlanAction]: (state,{payload}) =>({
            ...state,
            loading:payload
        }),
        [actions.setPlanDataAction]: (state,{payload}) =>({
            ...state,
            data:payload
        }),
        [actions.setPlanErrorAction]: (state,{payload}) =>({
            ...state,
            error:payload
        }),

    },
    initialState,
);
