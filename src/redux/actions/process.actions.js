import axios from "axios";
import * as urls from  '../../api/urls';

export const getProcessById = async (processId, token) => {

  const response = await axios.get(`${urls.URL_BASE}${urls.urlGetProcessById}${processId}`,{
      headers: {
        Authorization: 'Bearer ' + token
      }
  });

  return response.data;
}

export const updateProcessXML = async (processId, xml, token) => {

    const data = {
        id: processId,
        xml_body: xml,
    };

    const response = await axios.put(`${urls.URL_BASE}${urls.urlUpdateProcessXML}`, data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });
  
    return response.data;
}