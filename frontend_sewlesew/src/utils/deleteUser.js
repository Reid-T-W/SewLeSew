import axios from 'axios';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

  export const deleteUser = async (url, headers) => {
    axios.defaults.withCredentials = true;
    return await axios.delete(`${url}`, {headers})
    .then((data) => { 
      return({ data: data.data.message }) 
    })
    .catch((error) => { 
      throw Error(error.response.data.error) 
    });
}
