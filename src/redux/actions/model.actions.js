import axios from "axios";
import { createAction } from "redux-actions";
import { URL_BASE, urlCreateModel, urlUpdateModel, urlDeleteModel } from "../../api/urls";

export const setModelState = createAction("SET_MODEL_STATE");
export const setCreateModelErrorAction = createAction(
  "SET_CREATE_MODEL_ERROR_ACTION"
);
export const setDeleteModelErrorAction = createAction(
  "SET_DELETE_MODEL_ERROR_ACTION"
);

export const createModel = (model, userId, teamId, token) => async (
  dispatch,
  getState
) => {

  const new_model = {
    name: model.shortName,
    description: model.description,
    long_description: model.description,
    user_id: userId,
    price: parseInt(model.price),
    image: model.image,
    category_id: model.categoryId,
    team_id: teamId,
    hashtag: model.hashtag,
  };

  try {
    const {data, status} = await axios.post(
      `${URL_BASE}${urlCreateModel}`,
      new_model,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );


    if (status === 200 || status === 201) {
      dispatch(setModelState(data));
      dispatch(
          setCreateModelErrorAction({
          message: "Success",
        })
      );
      return 201;
    } else {
        return 404;
    }
  } catch (error) {
    dispatch(
      setCreateModelErrorAction({
        message: "Error creating new model",
      })
    );
  }
};

export const editModel = (model, userId, teamId, token) => async (
  dispatch,
  getState
) => {
  const edit_model = {
    name: model.shortName,
    description: model.description,
    long_description: model.description,
    user_id: userId,
    price: parseInt(model.price),
    image: model.image,
    category_id: model.categoryId,
    team_id: teamId,
    hashtag: model.hashtag,
    id: model.modelId
  };

  try {
    const {data, status} = await axios.put(
      `${URL_BASE}${urlUpdateModel}`,
      edit_model,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (status === 200 || status === 201) {
      dispatch(setModelState(data));
      dispatch(
          setCreateModelErrorAction({
          message: "Success",
        })
      );
      return 200;
    } else {
        return 404;
    }
  } catch (error) {
    dispatch(
      setCreateModelErrorAction({
        message: "Error editing new model",
      })
    );
  }
};

export const deleteModel = (modelId, token) => async (
  dispatch,
  getState
) => {
  try {
    const { status } = await axios.put(
      `${URL_BASE}${urlDeleteModel}`,
      {
        id: modelId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (status === 200) {
      dispatch(
          setDeleteModelErrorAction({
          message: "Success",
        })
      );
    }
    return status;
  } catch (error) {
    dispatch(
      setDeleteModelErrorAction({
        message: "Error deleting model",
      })
    );
  }
};