import axios from "axios";
import * as urls from  '../../api/urls';

export const checkTeamAvailability = (team_name, token) => {

    return new Promise(function (resolve, reject) {

        axios.post(`${urls.URL_BASE}${urls.urlCheckTeamAvailability}`, {name: team_name}, {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }).then(
            response => {
                var result = response.data;
                resolve(result);
            }, error => {
                reject(error);
            }
        );

    });
}