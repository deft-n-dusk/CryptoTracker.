import axios from "axios";

export const get100Coins = () => {
    const myCoins = axios.get("https://cryptotrackerbe.netlify.app/.netlify/functions/coins")
      .then((response) => {
          return response.data;
      })
      .catch((error) => {
        console.log(error)
        
      })
      return myCoins;
}