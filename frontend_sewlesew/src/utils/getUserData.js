import axios from 'axios';


export const getUserData = async (url, headers) => {
    return await axios.get(`${url}`, { headers })
    .then((data) => {
      console.log(data);
        return({ data: data.data }) 
      })
      .catch((error) => {
        console.log(headers);
        return(error.response.data.error) });
}