import axios from "axios";
import * as urls from "../../api/urls";
import store from "../../redux/store";
import { transformCypherResult } from "../../app/components/custom/graphModelizer/graph/utils";
import * as actionsModel from "./graph-modelizer.actionsTypes";

export const setTeamId = (teamId) => {
  store.dispatch({
    type: actionsModel.SET_USER,
    payload: {
      teamId: teamId,
    },
  });
};

export const setModelId = async (modelId) => {
  store.dispatch({
    type: actionsModel.SET_MODEL_ID,
    payload: {
      modelId: modelId,
    },
  });
};

export const getModelsListByUser = async (userId, token) => {
  const response = await axios.get(
    `${urls.URL_BASE}models/list/team/${userId}`,
    {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    }
  );

  return response.data;
};

export const getModelByFilter = async (
  modelId,
  userId,
  condition,
  value,
  token
) => {
  const response = await axios.get(
    `${urls.URL_BASE}${urls.urlGetModelByFilterNeo4j}?user_id=${userId}&model_id=${modelId}&condition=${condition}&value=${value}`,
    {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    }
  );
  const raw_data = response.data.payload;

  const model = transformCypherResult(raw_data);

  await store.dispatch({
    type: actionsModel.SET_MODEL,
    payload: {
      selectedSubsystems: model,
      id: modelId,
    },
  });
  return true;
};

export const getModel = async (modelId, teamId, token) => {
  const response = await axios.get(
    `${urls.URL_BASE}${urls.urlGetModelNeo4j}?team_id=${teamId}&model_id=${modelId}`,
    {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    }
  );

  const raw_data = response.data;
  const model = transformCypherResult(raw_data);

  await store.dispatch({
    type: actionsModel.SET_MODEL,
    payload: {
      selectedSubsystems: model,
      id: modelId,
    },
  });
  return true;
};

export const updateModel = async (graphModel, graphModelId, token) => {
  graphModel.id = String(graphModelId);
  graphModel.userId = graphModel.teamId;
  try {
    const response = await axios.post(
      `${urls.URL_BASE}${urls.urlCreateModelNeo4j}`,
      {
        model: graphModel,
        // user_id: userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      }
    );

    return response.status;
  } catch (e) {
    return e;
  }
};

// function for setting up models generalities
export const instantiateModel = async (name, description, userId, token) => {
  try {
    //const token = getState()?.LoginState?.data?.access_token;
    const response = await axios.post(
      `${urls.URL_BASE}models/create`,
      {
        name: name,
        description: description,
        user_id: userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      }
    );
    return response.status;
  } catch (e) {
    return e;
  }
};

export const addSubsystem = (subsystem) => {
  return {
    type: actionsModel.ADD_SUBSYSTEM,
    payload: {
      name: subsystem.name,
      id: subsystem.id,
      components: subsystem.components,
      selectedComponents: [],
    },
  };
};

export const removeSubsystem = (subsystem) => {
  return {
    type: actionsModel.DELETE_SUBSYSTEM,
    payload: {
      id: subsystem.id,
    },
  };
};

export const addComponent = (component) => {
  return {
    type: actionsModel.ADD_COMPONENT,
    payload: {
      subsystemId: component.subsystemId,
      name: component.name,
      id: component.id,
      key: false,
      type: "variable",
      relationships: [],
    },
  };
};

export const removeComponent = (component) => {
  return {
    type: actionsModel.REMOVE_COMPONENT,
    payload: {
      subsystemId: component.subsystemId,
      id: component.id,
    },
  };
};

export const addRelationship = (selectedComponent, relationship) => {
  return {
    type: actionsModel.ADD_RELATIONSHIP,
    payload: {
      sourceSubsystemId: selectedComponent.subsystemId,
      sourceComponentId: selectedComponent.id,
      subsystemId: relationship.subsystemId,
      componentId: relationship.id,
      name: relationship.name,
      id: relationship.id,
      interaction: {
        intensity: "Medium",
        key: false,
        state: 3,
      },
    },
  };
};

export const removeRelationship = (selectedComponent, relationship) => {
  return {
    type: actionsModel.REMOVE_RELATIONSHIP,
    payload: {
      subsystemId: selectedComponent.subsystemId,
      componentId: selectedComponent.id,
      id: relationship.id,
    },
  };
};

export const updateRelationshipFeatures = (
  subsystemId,
  componentId,
  newRelationship
) => {
  return {
    type: actionsModel.UPDATE_RELATIONSHIP_FEATURES,
    payload: {
      subsystemId: subsystemId,
      componentId: componentId,
      newRelationship: newRelationship,
    },
  };
};

export const changeComponentAttribute = (
  subsystemId,
  componentId,
  newComponent
) => {
  return {
    type: actionsModel.CHANGE_COMPONENT_ATTRIBUTE,
    payload: {
      subsystemId: subsystemId,
      componentId: componentId,
      newComponent: newComponent,
    },
  };
};

export const resetModelStore = () => {
  store.dispatch({
    type: actionsModel.RESET_MODEL_STORE,
  });
};

export const deleteModel = async (modelId, userId, token) => {
  const response_main = await axios.put(
    `${urls.URL_BASE}models/delete`,
    {
      id: modelId,
    },
    {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    }
  );

 
  const headers = {
    Authorization: "Bearer " + token,
  };
  if (response_main.status === 200) {
    await axios.delete(
      `${urls.URL_BASE}${urls.urlDeleteModelNeo4j}?modelId=${modelId}&userId=${userId}`,
      {
        headers,
      }
    );
  }
};

export const updateRelationships = (componentId) => {
  /*
    Details:
        Function for removing related relationships to a component after this is removed.

    Params:
        componentId: id of the removed component.
     */

  const modelStore = { ...store.getState().ReducerModel };
  for (let i = 0; i < modelStore.selectedSubsystems.length; i++) {
    for (
      let j = 0;
      j < modelStore.selectedSubsystems[i].selectedComponents.length;
      j++
    ) {
      modelStore.selectedSubsystems[i].selectedComponents[
        j
      ].relationships = modelStore.selectedSubsystems[i].selectedComponents[
        j
      ].relationships.filter((c) => {
        return c.id !== componentId;
      });
    }
  }
  store.dispatch({
    type: actionsModel.UPDATE_RELATIONSHIPS,
    payload: {
      newModelStore: modelStore,
    },
  });
};

export const updateRelationshipsFromSubsystem = (subsystemId) => {
  /*
    Details:
        Function for removing related relationships to a subsystem after this is removed.

    Params:
        subsystemId: id of the removed subsystem.
     */

  const modelStore = { ...store.getState().ReducerModel };
  for (let i = 0; i < modelStore.selectedSubsystems.length; i++) {
    for (
      let j = 0;
      j < modelStore.selectedSubsystems[i].selectedComponents.length;
      j++
    ) {


      modelStore.selectedSubsystems[i].selectedComponents[
        j
      ].relationships = modelStore.selectedSubsystems[i].selectedComponents[
        j
      ].relationships.filter((c) => {
        return c.subsystemId !== subsystemId;
      });


    }
  }

  return
/*
  store.dispatch({
    type: actionsModel.UPDATE_RELATIONSHIPS_FROM_SUBSYSTEM,
    payload: {
      newModelStore: modelStore,
    },
  });*/
};

export const getAllRelationships = () => {
  /*
    Details:
        Function getting all the relationships in the store in the form required for the table component.

    Return:
        relationships: array of objects.
     */

  let relationships = [];
  const modelStore = { ...store.getState().ReducerModel };
  let index = 0;

  for (let i = 0; i < modelStore.selectedSubsystems.length; i++) {
    for (
      let j = 0;
      j < modelStore.selectedSubsystems[i].selectedComponents.length;
      j++
    ) {
      for (
        let k = 0;
        k <
        modelStore.selectedSubsystems[i].selectedComponents[j].relationships
          .length;
        k++
      ) {
        relationships.push({
          index: index,
          source: {
            id: modelStore.selectedSubsystems[i].selectedComponents[j].id,
            name: modelStore.selectedSubsystems[i].selectedComponents[j].name,
            subsystemId:
              modelStore.selectedSubsystems[i].selectedComponents[j]
                .subsystemId,
            type: modelStore.selectedSubsystems[i].selectedComponents[j].type,
          },
          target: {
            id:
              modelStore.selectedSubsystems[i].selectedComponents[j]
                .relationships[k].id,
            subsystemId:
              modelStore.selectedSubsystems[i].selectedComponents[j]
                .relationships[k].subsystemId,
            type:
              modelStore.selectedSubsystems[i].selectedComponents[j]
                .relationships[k].type,
            name:
              modelStore.selectedSubsystems[i].selectedComponents[j]
                .relationships[k].name,
            interaction: {
              intensity:
                modelStore.selectedSubsystems[i].selectedComponents[j]
                  .relationships[k].interaction.intensity,
              key:
                modelStore.selectedSubsystems[i].selectedComponents[j]
                  .relationships[k].interaction.key,
              state:
                modelStore.selectedSubsystems[i].selectedComponents[j]
                  .relationships[k].interaction.state,
            },
          },
        });
        index += 1;
      }
    }
  }
  return relationships;
};

export const updateSelectedComponents = (subsystemId) => {
  /*
    Details:
        Function for returning the current components in the State

    Params:
        subsystemId: id of the removed subsystem.
     */

  const modelStore = { ...store.getState().ReducerModel };
  let updatedComponentsList = []
  for (let i = 0; i < modelStore.selectedSubsystems.length; i++) {
    for (
      let j = 0;
      j < modelStore.selectedSubsystems[i].selectedComponents.length;
      j++
    ) {
      updatedComponentsList.push(modelStore.selectedSubsystems[i].selectedComponents[j])
    }
  }
  return updatedComponentsList;
};
