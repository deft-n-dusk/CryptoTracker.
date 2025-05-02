import axios from "axios";

export const getCoinPrices = (id, days, priceType) => {

const prices= axios
    .get(
        `https://cryptotrackerbe.netlify.app/.netlify/functions/chart?id=${id}&days=${days}`)
    .then((response) => {
         return response.data[priceType];
        
        })
    
    .catch((error) => {
       console.log(error)
     
    })

    return prices;
}

