import React from 'react'
import "./style.css"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

function Grid({coin}) {
  return (
    
    <Link to={`/coin/${coin.id}`}>
    <div className={ `grid-container ${
      coin.price_change_percentage_24h < 0 && "grid-container-red"
    }` } >

      <div className='info-flex'>
        <img src={coin.image} className='coin-logo' />
        <div className='name-col'>
          <p className='coin-symbol'>{coin.symbol}</p>
          <p className='coin-name'>{coin.name}</p>
        </div>
      </div>
      {coin.price_change_percentage_24h > 0 ? (
          <div className='chip-flex'>
             <Tooltip title="price change percentage in 24hrs">
          <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
          </Tooltip>
          <div className='icon-chip'><TrendingUpIcon/></div>
        </div>
      ) : (
        <div className='chip-flex'>
          <Tooltip title="price change percentage in 24hrs">
            <div className='price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
        </Tooltip>
        <div className='icon-chip chip-red'><TrendingDownIcon/></div>
      </div>
      )}
      <div className='info-container'></div>
      <Tooltip title="Current Price" placement='bottom-start'>
      <h3 className='coin-price'
          style={{color: coin.price_change_percentage_24h > 0 
          ? "var(--green)" 
          : "var(--red)" }}
          >
          ${coin.current_price.toLocaleString()}</h3>
          </Tooltip>
          <p className='total_volume'> 
              Total Volume : {coin.total_volume.toLocaleString()}
          </p>
          <p className='market_cap'> 
              Market Cap : {coin.market_cap.toLocaleString()}
          </p>
    </div>
    </Link>
  )
}

export default Grid