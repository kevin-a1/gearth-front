import axios from "axios";
import * as urls from  '../../api/urls';

export const createActivity = async (data, token) => {

    const activity = {
        name: data?.name,
        description: '',
        long_description: '',
        duration_in_days: 0,
        process_id: data?.processId,
        task_id: data?.taskId,
    };

    const response = await axios.post(`${urls.URL_BASE}${urls.urlCreateActivity}`, activity, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}

export const getActivityByTask = async (taskId, token) => {

    const response = await axios.get(`${urls.URL_BASE}${urls.urlGetActivityByTask}${taskId}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}

export const updateActivityByTask = async (taskId, data, token) => {

    const activity = {
        name: data?.name,
        description: data?.desc,
        long_description: data?.lgDesc,
        duration_in_days: data?.duration,
    }

    const response = await axios.put(`${urls.URL_BASE}${urls.urlUpdateActivityByTask}${taskId}`, activity, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}

export const updateActivityTypeByTask = async (taskId, type, token) => {

    const typeData = {
        type: type,
    }

    const response = await axios.put(`${urls.URL_BASE}${urls.urlUpdateActivityByTask}${taskId}`, typeData, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}

export const deleteActivityByTask = async (taskId, token) => {

    const response = await axios.delete(`${urls.URL_BASE}${urls.urlDeleteActivityByTask}${taskId}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
    });

    return response.data;
}