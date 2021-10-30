import axios from "axios";
import * as urls from  '../../api/urls';

export const getMomentsModelByModelId = async (modelId, token) => {
  const response = await axios.get(`${urls.URL_BASE}${urls.urlListMomentsModelByMoment}${modelId}`,{
      headers: {
        Authorization: 'Bearer ' + token
      }
  });

  return response.data;
}