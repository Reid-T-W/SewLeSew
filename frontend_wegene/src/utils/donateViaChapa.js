import axios from 'axios';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

  export const donateViaChapa = async (url, data, headers) => {
    // axios.defaults.withCredentials = true;
    return await axios.post(`${url}`, data, {headers})
    .then((data) => { 
      return({ data: data }) 
    })
    .catch((error) => { 
      throw Error(error.response.data.error) 
    });
}
