import axios from "axios";

export const getCoinData = (id) => {

    const myData=axios
    .get(`https://cryptotrackerbe.netlify.app/.netlify/functions/coin?id=${id}`)
    .then((response) => {
        return response.data;
    })
    
    .catch((error) => {
      console.log(error.message)
    })
    return myData;
}