import axios from 'axios';
import * as urls from '../../api/urls';
import { createAction } from 'redux-actions';

export const setSurveyState = createAction('SET_SURVEY_STATE');
export const setCreateSurveyErrorAction = createAction('SET_CREATE_SURVEY_ERROR_ACTION');
export const setDeleteSurveyErrorAction = createAction('SET_DELETE_SURVEY_ERROR_ACTION');
export const setSurveysByProcessState = createAction('SET_SURVEYSBYPROCESS_STATE');

export const createSurvey = (survey, processId, activityId, modelId, token) => async( dispatch, getState ) =>{

  const new_survey ={
    name: survey.name,
    description: survey.description,
    process_id: processId,
    activity_id: activityId,
    model_id: modelId,
    json_body:{
      questions:[]
    },
    status:1 ,
  };
  try{
      const {data, status} = await axios.post(
        `${urls.URL_BASE}${urls.urlCreateSurvey}`,
        new_survey,
        {
          headers:{
            Authorization:'Bearer '+ token
          },
        }
      );

      if (status === 200 || status === 201) {
        dispatch(setSurveyState(data));
        dispatch(
          setCreateSurveyErrorAction({
            message:'Success',
          })
        );
        return 201;
      } else {
        return 404;
      }
  } catch(error){
    dispatch(
      setCreateSurveyErrorAction({
        message:'Error creating new survey',
      })
    );
  }
};

export const editSurvey = (survey, token) => async( dispatch, getState) =>{

  const edit_survey = {
    name: survey.name,
    description: survey.name,
    process_id: survey.process_id,
    json_body:survey.json_body,
    status:survey.status,
  };
  try {
      const {data, status} =await axios.put(
        `${urls.URL_BASE}${urls.urlUpdateSurvey}${survey.id}`,
        edit_survey,
        {
          headers:{
            Authorization:'Bearer '+ token
          },
        }
      );

      if (status === 200 || status === 201) {
        dispatch(setSurveyState(data));
        dispatch(
          setCreateSurveyErrorAction({
            message:'Success',
          })
        );
        return 200;
      } else {
        return 404;
      }
  } catch (error) {
    dispatch(
      setCreateSurveyErrorAction({
        message:'Error editing new Survey',
      })
    );
  }
};

export const getSurveyByProcess = async (processId, token) =>{
  const {data, status} = await axios.get(
    `${urls.URL_BASE}${urls.urlListSurveysByProcess}${processId}`,{
      headers:{
        Authorization:'Bearer '+ token
      },
    }
  );
  return data.data;
};

export const getSurveyByActivity = async (activityId, token) =>{
  const {data, status} = await axios.get(
    `${urls.URL_BASE}${urls.urlListSurveysByActivity}${activityId}`,{
      headers:{
        Authorization:'Bearer '+ token
      },
    }
  );
  return data.data;
};

export const getSurveyById = async (surveyId, token) =>{
  const {data, status} = await axios.get(
    `${urls.URL_BASE}${urls.urlGetSurveyById}${surveyId}`,{
      headers:{
        Authorization:'Bearer '+ token
      },
    }
  );
  return data.data;
};

export const deleteSurvey = async( surveyId, token) =>{
  const response = await axios.delete(
    `${urls.URL_BASE}${urls.urlDeleteSurvey}${surveyId}`,{
      headers:{
        Authorization:'Bearer '+ token
      },
    }
  );
  return response;
};

 export const getVariables = async( modelId, token) =>{
   const response = await axios.get(
     `${urls.URL_BASE}${urls.urlListVariables}${modelId}`,{
       headers:{
         Authorization:'Bearer '+ token
       },
     }
   );
   return response.data;
 };
