import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    // const { page, setPage } = useState(1);
    const [progress, setProgress] = useState(10);
    const { currency, symbol } = CryptoState();
    const navigate = useNavigate();

    const fetchCoins = async () => {
        setLoading(true);
        setProgress(10);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
        setProgress(100);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };




    return (
        <div className='container text-center'>
            <h1 style={{ margin: '18px', fontWeight: 500 }}>Cryptocurrency Prices by Market Cap</h1>

            <input
                className='form-control mr-sm-2'
                type='search'
                style={{ marginBottom: 20, width: '100%', color: 'white', background: 'black' }}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                placeholder='Search for a Crypto Currency..'
                aria-label='Search'
            />
            
        
            <table className='table' style={{
                color: 'white',
                backgroundColor: "#16171a",


            }}>
                <thead>
                    <tr style={{ background: 'gold', color: 'black' }}>
                        <th scope='col'>Coin</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>24h change</th>
                        <th scope='col'>MarketPrice</th>
                    </tr>
                </thead>
                {loading? ( <LoadingBar
                    color='#f11946'
                    progress={progress}
                    
                />):
            
                (<tbody >
                    {handleSearch().map((row) => {
                        const profit = row.price_change_percentage_24h > 0;
                        const image = row.image || '';
                        const name = row.name || '';
                        return (
                            <tr
                                onClick={() => navigate(`/coins/${row.id}`)}
                                key={row.name}
                                style={{
                                    cursor: 'pointer',
                                    "&:hover": {
                                        backgroundColor: "#131111",
                                    },
                                }}
                            >
                                <td style={{ display: "flex", gap: 15 }}>
                                    <img src={image} alt={name} height='40' style={{ marginBottom: 10 }} />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span style={{
                                            textTransform: "uppercase",
                                            fontSize: 22,
                                        }}>
                                            {row.symbol}
                                        </span>
                                        <span style={{ color: "darkgrey" }}>{row.name}</span>
                                    </div>
                                </td>
                                <td style={{ align: "right", paddingTop: "2%" }}>
                                    {symbol}{" "}
                                    {numberWithCommas(row.current_price.toFixed(2))}
                                </td>
                                <td style={{
                                    align: "right",
                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                    fontWeight: 500,
                                    paddingTop: "2%"
                                }}>
                                    {profit && '+'}
                                    {row.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td  style={{paddingTop: "2%"}}>
                                    {symbol}{" "}
                                    {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                    M
                                </td>
                            </tr>
                        );
                    })}
                </tbody>)}
            </table>
           {/* To Do task is to add pagination using bootstrap */}
           {/* <Pagination style={{
               padding:20,
               width:"100%",
               display: "flex",
               justifyContent: "center",
               count = {(handleSearch()?.length()/10).toFixed(0)}
               onChange = {(_, value)=>{
                setPage(value);
                window.scroll(0,450);
               }}
           }}/> */}
        </div>
    );
};

export default CoinsTable;
