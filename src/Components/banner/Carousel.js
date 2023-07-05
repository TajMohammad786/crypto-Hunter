import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import { useNavigate } from 'react-router-dom';

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
}


const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const coinImage = coin && coin.image ? coin.image : '';
    const coinName = coin ? coin.name : '';
    const coinSymbol = coin && coin.symbol ? coin.symbol : '';
    const profit = coin.price_change_percentage_24h >= 0;
    const percentChange = coin && coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : '';
    const number = coin && coin.current_price ? coin.current_price.toFixed(2) : '';

    return (
      <span
        key={coin.id}
        onClick={() => navigate(`/coins/${coin.id}`)}
        style={{ cursor: 'pointer',
                  display: "flex",
                  flexDirection: "column", 
                  alignItems: "center",
                  textTransform: "uppercase",
                  color:"white",
      
      }}
      >
        <img src={coinImage} alt={coinName} height="80" style={{ marginBottom: 10 }} />
        <span>
          {coinSymbol}&nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red", 
              fontWeight: 500,
            }}
          >
            {profit && '+'}{percentChange}%
          </span>
        </span>
        
        <span style={{fontSize: 22, fontWeight: 500}}>
          {symbol}{numberWithCommas(number)}
        </span>
      </span>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
