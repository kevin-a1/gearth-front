import * as actions from '../actions/survey.actions';

const { handleActions } = require('redux-actions');

const initialState = {
  survey:null
};

export const SurveyReducer = handleActions(
  {
    [actions.setSurveyState]: (state,{ payload }) =>({
      ...state,
      survey:payload,
    }),
  },
  initialState
);
