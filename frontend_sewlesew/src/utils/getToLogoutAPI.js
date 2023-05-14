import axios from 'axios';


export const getToLogoutAPI = async (url, headers) => {
    return await axios.get(`${url}`, { headers })
    .then((data) => {
        return({ data: data.data.message }) 
      })
      .catch((error) => {
        return(error.response.data.error) });
}