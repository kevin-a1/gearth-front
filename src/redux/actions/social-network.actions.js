import axios from "axios";
import { createAction } from "redux-actions";
import { URL_BASE_SOCIAL_NETWORK, urlChannels } from "../../api/urls";

export const setChannels = createAction("SET_CHANNELS");
export const reset = createAction("RESET");


export const setCreateChannelErrorAction = createAction(
  "SET_CREATE_CHANNEL_ERROR_ACTION"
);

export const resetChannels = () => async (dispatch, getState) => {
  await dispatch(reset())
}

export const getChannels = (modelId, token) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get(
      `${URL_BASE_SOCIAL_NETWORK}${urlChannels}?model_id=${modelId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (status === 200) {
      dispatch(setChannels(data));
      dispatch(
        setCreateChannelErrorAction({
          message: "Success",
        })
      );
    } else {
      console.log(data);
    }
  } catch (error) {
    dispatch(
      setCreateChannelErrorAction({
        message: "Error retrieving channels",
      })
    );
  }
};

export const deleteChannel = (channelId, token) => async (
  dispatch,
  getState
) => {
  try {
    const { status } = await axios.delete(
      `${URL_BASE_SOCIAL_NETWORK}${urlChannels}?channel_id=${channelId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (status === 200) {
        const _channels = [...getState().SocialNetworkState.channels].filter(c => c.id !== channelId);
        dispatch(setChannels(_channels));
        dispatch(
            setCreateChannelErrorAction({
                message:"Success"
            })
        );
        return [200, _channels];
    } else {
        return [404, [...getState().SocialNetworkState.channels]];
    }
  } catch (error) {
    dispatch(
      setCreateChannelErrorAction({
        message: "Error deleting channel",
      })
    );
  }
};

export const createChannel = (channel, token, rolNavState) => async (dispatch, getState) => {
  try {
    const {data, status} = await axios.post(
      `${URL_BASE_SOCIAL_NETWORK}${urlChannels}`,
      {
        name: channel.name,
        description: channel.description,
        model_id: channel.model_id,
        rol_nav_state: rolNavState
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (status === 200) {
      const _channels = [...getState().SocialNetworkState.channels, data];
      dispatch(setChannels(_channels));
      dispatch(
        setCreateChannelErrorAction({
          message: "Success",
        })
      );
      return [200, _channels];
    } else {
        return [404, [...getState().SocialNetworkState.channels]];
    }
  } catch (error) {
    console.log(error)
    dispatch(
      setCreateChannelErrorAction({
        message: "Error creating new channel",
      })
    );
    // return [404, [...getState().SocialNetworkState.channels]];
  }
};

const getIndex = (channels, id) => {
    return channels.findIndex(c => c.id = id);
}

export const updateChannel = (channel, token) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.put(
        `${URL_BASE_SOCIAL_NETWORK}${urlChannels}`,
        {
          id: channel.id,
          name: channel.name,
          description: channel.description,
          model_id: channel.model_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const _channels = [...getState().SocialNetworkState.channels];
      if (status === 200) {
        const index = getIndex(_channels, channel.id)
        _channels[index] = channel
        dispatch(setChannels(_channels));
        dispatch(
          setCreateChannelErrorAction({
            message: "Success",
          })
        );
        return [200, [...getState().SocialNetworkState.channels]];
      } else {
          return [404, [...getState().SocialNetworkState.channels]];
      }
    } catch (error) {
      dispatch(
        setCreateChannelErrorAction({
          message: "Error updating channel",
        })
      );
    }
  };