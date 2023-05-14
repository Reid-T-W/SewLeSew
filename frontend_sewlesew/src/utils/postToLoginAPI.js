import axios from 'axios';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

  export const postToLoginAPI = async (url, data) => {
    axios.defaults.withCredentials = true;
    return await axios.post(`${url}`, data)
    .then((data) => { 
      const session_id = Cookies.get('session_id');
      return({ data: data.data.message, session_id, userData: data.data.userData }) 
    })
    .catch((error) => {
      throw Error(error.response.data.error);
    })
}
