import * as actions from '../actions/social-network.actions';

const {handleActions} = require('redux-actions');

const initialState ={
    channels:[],
    error:null,
};

export const SocialNetworkReducer = handleActions(
    {
        [actions.setChannels]: (state,{payload}) =>({
            ...state,
            channels: payload
        }),
        [actions.reset]: (state) =>({
            ...state,
            channels: []
        }),
        [actions.setCreateChannelErrorAction]: (state,{payload}) =>({
            ...state,
            error:payload
        }),
    },
    initialState,
);
