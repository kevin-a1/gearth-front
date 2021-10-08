import * as actions from "../actions/rol-navigation.actions";

const { handleActions } = require("redux-actions");

const initialState = {
  state: 0
};

export const RolNavigationReducer = handleActions(
  {
    [actions.setRolNavigationState]: (state, { payload }) => ({
      ...state,
      state: payload,
    }),
  },
  initialState
);
