import axios from 'axios';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

  export const postToAPI = async (url, data) => {
    axios.defaults.withCredentials = true;
    return await axios.post(`${url}`, data)
    .then((data) => { 
      return({ data: data.data.message }) 
    })
    .catch((error) => { 
      throw Error(error.response.data.error) 
    });
}
