import axios from "axios";
import * as urls from  '../../api/urls';

export const getRolesById = async (userId, token) => {
  const response = await axios.get(`${urls.URL_BASE}${urls.urlListRolesById}${userId}`,{
      headers: {
        Authorization: 'Bearer ' + token
      }
  });

  return response.data;
}

export const getRoles = async (token) => {
    const response = await axios.get(`${urls.URL_BASE}${urls.urlListRoles}`,{
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}