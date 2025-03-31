import React from 'react'
import "./style.css"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumbers';
import { useNavigate } from "react-router-dom";
import { tbody } from 'framer-motion/client';

function List({ coin }) {
  const navigate = useNavigate();
  return (
    <table>
      <tbody>
        <tr className='list-row' onClick={() => navigate(`/coin/${coin.id}`)}>
          <Tooltip title="Coin logo" placement='bottom-start'>
            <td className='td-image'>
              <img src={coin.image} className='coin-logo' />
            </td>
          </Tooltip>

          <Tooltip title="Coin Info" placement='bottom-start'>
            <td className='td-info'>

              <div className='name-col'>
                <p className='coin-symbol'>{coin.symbol}</p>
                <p className='coin-name'>{coin.name}</p>
              </div>

            </td>
          </Tooltip>

          <Tooltip title="Price change in 24 Hrs" placement='bottom-start'>
            {coin.price_change_percentage_24h > 0 ? (
              <td className='chip-flex'>
                <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon-chip td-icon'><TrendingUpIcon /></div>
              </td>
            ) : (
              <td className='chip-flex'>
                <div className='price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon-chip chip-red td-icon'><TrendingDownIcon /></div>
              </td>
            )}
          </Tooltip>

          <Tooltip title="Current Price" placement='bottom-end'>
            <td className='coin-price-parent'>
              <h3 className='coin-price td-center-align'
                style={{
                  color: coin.price_change_percentage_24h > 0
                    ? "var(--green)"
                    : "var(--red)"
                }}
              >
                ${coin.current_price.toLocaleString()}</h3>
            </td>
          </Tooltip>

          <Tooltip title="Total Volume" placement='bottom-end'>
            <td>
              <p className='total_volume td-right-align td-total-volume'>
                {coin.total_volume.toLocaleString()}
              </p>
            </td>
          </Tooltip>

          <Tooltip title="Market Cap" placement='bottom-end'>
            <td className='desktop-td-mkt'>
              <p className='market_cap td-right-align'>
                {coin.market_cap.toLocaleString()}
              </p>
            </td>
          </Tooltip>


          <Tooltip title="Market Cap" placement='bottom-end'>
            <td className='mobile-td-mkt'>
              <p className='market_cap td-right-align'>
                ${convertNumber(coin.market_cap)}
              </p>

            </td>
          </Tooltip>
        </tr>
      </tbody>
    </table>

  )
}

export default List