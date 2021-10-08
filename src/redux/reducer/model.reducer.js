import * as actions from "../actions/model.actions";

const { handleActions } = require("redux-actions");

const initialState = {
  model: null
};

export const ModelReducer = handleActions(
  {
    [actions.setModelState]: (state, { payload }) => ({
      ...state,
      model: payload,
    }),
  },
  initialState
);
