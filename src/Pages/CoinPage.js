import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import CoinsData from '../Components/CoinsData';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';
import { numberWithCommas } from '../Components/CoinsTable';
import LoadingBar from 'react-top-loading-bar';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [progress, setProgress] = useState(10);

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setProgress(100);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const coinImage = coin && coin.image.large ? coin.image.large : '';
  const coinName = coin ? coin.name : '';
  const coinDesc = coin && coin.description.en.split('. ')[0] ? coin.description.en.split('. ')[0] : '';
  const rank = coin && coin.market_cap_rank ? coin.market_cap_rank : '';
  const currPrice = coin && coin.market_data.current_price[currency.toLowerCase()] ? coin.market_data.current_price[currency.toLowerCase()] : '';
  const marketCap = coin && coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6) ? coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6) : '';

  if (!coin) {
    return <LoadingBar color="#f11946" progress={progress} />;
  }

  return (
    <div className="coin-page-container">
      <div className="sidebar">
        <img src={coinImage} alt={coinName} height="160" style={{ marginBottom: 15 }} />
        <h2 style={{ fontWeight: 'bold', marginBottom: 15 }}>{coinName}</h2>
        <p className="desc">{ReactHtmlParser(coinDesc)}</p>
        <div className="marketData">
          <span style={{ display: 'flex' }}>
            <h5 style={{ fontWeight: 'bold', marginBottom: 15 }}>Rank:</h5>
            &nbsp; &nbsp;
            <h5>{rank}</h5>
          </span>
          <span style={{ display: 'flex' }}>
            <h5 style={{ fontWeight: 'bold', marginBottom: 15 }}>Current Price:</h5>
            &nbsp; &nbsp;
            <h5>
              {symbol} {numberWithCommas(currPrice)} 
            </h5>
          </span>
          <span style={{ display: 'flex' }}>
            <h5 style={{ fontWeight: 'bold', marginBottom: 15 }}>Market Cap:</h5>
            &nbsp; &nbsp;
            <h5>{numberWithCommas(marketCap)} M</h5>
          </span>
        </div>
      </div>

      <CoinsData coin={coin} />

      <style jsx = 'true'>{`
        .coin-page-container {
          display: flex;
          flex-direction: column;
          // align-items: center;
          margin-top: 5%;
        }

        .sidebar {
          width: 100%;
        }

        @media screen and (min-width: 768px) {
          .coin-page-container {
            flex-direction: row;
          }
          .marketData {
            align-self: self-start;
            padding: 25px;
            padding-top: 10px;
            width: 100%;
            flex-direction: column;
            align-items: center;
          }

          .sidebar {
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
            border-right: 2px solid grey;
          }
        }

        .desc {
          width: 100%;
          padding: 25px;
          padding-bottom: 15px;
          padding-top: 0;
          text-align: justify;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default CoinPage;
