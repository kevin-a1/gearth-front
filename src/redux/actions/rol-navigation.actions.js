import { createAction } from "redux-actions";

export const setRolNavigationState = createAction("SET_ROL_NAVIGATION_STATE");
export const setRolNavigationStateErrorAction = createAction(
  "SET_ROL_NAVIGATION_STATE_ERROR_ACTION"
);

export const setRolNavigation = (state) => async (
  dispatch,
  getState
) => {
    try{
        dispatch(setRolNavigationState(state));
        dispatch(
            setRolNavigationStateErrorAction({
            message: "Success",
          })
        );
    } catch{
        dispatch(
            setRolNavigationStateErrorAction({
              message: "Error setting up rol navigation state",
            })
          );
    }
};

