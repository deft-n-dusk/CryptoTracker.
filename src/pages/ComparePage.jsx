import React, { useState, useEffect } from 'react'
import Header from '../Components/Common/Header'
import SelectCoins from '../Components/Compare/selectCoins'
import SelectDays from '../Components/Coin/SelectDays';
import { coinObject } from '../functions/convertObject';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import Loader from '../Components/Common/Loader';
import List from '../Components/Dashboard/List';
import CoinInfo from '../Components/Coin/CoinInfo';
import LineChart from '../Components/Coin/LineChart';
import { settingChartData } from '../functions/settingChartData';
import TogglePriceType from '../Components/Coin/PriceType';
import Footer from '../Components/Common/Footer';


function ComparePage() {

  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});

  async function handleDaysChange(event) {
    setIsLoading(true);
    const newDays = event.target.value; // Store new days value
    setDays(newDays); // Update state

    try {
        if (!crypto1 || !crypto2) {
            console.warn("Crypto1 or Crypto2 is not selected.");
            setIsLoading(false);
            return;
        }

        const prices1 = await getCoinPrices(crypto1, newDays, priceType);
        const prices2 = await getCoinPrices(crypto2, newDays, priceType);

        if (prices1.length > 0 && prices2.length > 0) {
            settingChartData(setChartData, prices1, prices2);
        } else {
            console.warn("Prices could not be fetched.");
        }
    } catch (error) {
        console.error("Error fetching prices:", error);
    } finally {
        setIsLoading(false); // Ensure loading stops even if an error occurs
    }
}


  const handlePriceTypeChange = async (e) => {
    const newPriceType = e.target.value;
    setIsLoading(true);
    setPriceType(newPriceType);
    const prices1 = await getCoinPrices(crypto1, days, newPriceType);
    const prices2 = await getCoinPrices(crypto2, days, newPriceType);
    if (prices1.length > 0 && prices2.length > 0) {
    settingChartData(setChartData, prices1, prices2);
    }
    else {
      console.warn("Prices could not be fetched.");
  }
    setIsLoading(false);
  };

  

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      getData();
  }, 800); // 800ms delay to reduce frequent requests

  return () => clearTimeout(timeout); 
  }, [crypto1, crypto2, days, priceType]);

  async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);
    if (data1) {
      coinObject(setCrypto1Data, data1);
    }
    if (data2) {
      coinObject(setCrypto2Data, data2);
    }
    if (data1 && data2) {
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
      settingChartData(setChartData, prices1, prices2)
        setIsLoading(false);
      }
    }
  

    const handleCoinChange = async (event, isCoin2) => {
      setIsLoading(true);
      const newCoin = event.target.value;
    
      if (isCoin2) {
        setCrypto2(newCoin);
    
        const data = await getCoinData(newCoin);
        if (!data || !data.id) {
          console.error("Error: Coin data is undefined or missing 'id'", data);
          setIsLoading(false);
          return;
        }
    
        coinObject(setCrypto2Data, data);
    
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(newCoin, days, priceType);
    
        if (prices1?.length > 0 && prices2?.length > 0) {
          setIsLoading(false);
        } else {
          console.warn("Prices could not be fetched.");
          setIsLoading(false);
        }
      } else {
        setCrypto1(newCoin);
    
        const data = await getCoinData(newCoin);
        if (!data || !data.id) {
          console.error("Error: Coin data is undefined or missing 'id'", data);
          setIsLoading(false);
          return;
        }
    
        coinObject(setCrypto1Data, data);
        setIsLoading(false);
      }
    };
    


  

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='coins-days-flex'>
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}

            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={crypto1Data} />
          </div>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={crypto2Data} />
          </div>

          <div className='grey-wrapper'>
                     <TogglePriceType priceType={priceType}  handlePriceTypeChange={handlePriceTypeChange}/>
                     <LineChart chartData={chartData} priceType={"prices"} multiAxis={true}/>
              </div>

          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
          <Footer/>
        </>
      )}
    </div>
  )
}


export default ComparePage