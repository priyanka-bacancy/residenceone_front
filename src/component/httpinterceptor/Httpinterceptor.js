import axios from 'axios';
import { getToken } from '../../global';

export const posts = (fullUrl) => {
  return {
    get: () => axios.get(fullUrl, {
      headers: { token: getToken() }
    })
      .then(function (res) {
        return res;
      })
      .catch(function (error) {
        console.log("Something went wrong.");
      }),
  };
}  