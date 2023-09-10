import React, { useEffect, useState } from 'react';


const coins = [
    { name: 'DOGE USDT', symbol: 'DOGEUSDT' },
    { name: 'ADA USDT ', symbol: 'ADAUSDT' },
    { name: 'SHIBA UNU USDt ', symbol: 'SHIBUSDT' },
    { name: 'TRX USDT ', symbol: 'TRXUSDT' },
    { name: 'MATIC USDT ', symbol: 'MATICUSDT' },
]
const Tracker = () => {
    const [binancePrice, setBinancePrice] = useState('');
    const [wazirxPrice, setWazirxPrice] = useState('');
    const [isBuying, setIsBuying] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState({ name: 'DOGE USDT', symbol: 'DOGEUSDT' });

    const binanceTestApiKey = 'YOUR_BINANCE_TEST_API_KEY';
    const binanceTestApiSecret = 'YOUR_BINANCE_TEST_API_SECRET';
    const wazirxTestApiKey = 'YOUR_WAZIRX_TEST_API_KEY';
    const wazirxTestApiSecret = 'YOUR_WAZIRX_TEST_API_SECRET';
    const coinSymbol = selectedCoin?.symbol

    const fetchPrices = async () => {
        try {
            const binanceResponse = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${coinSymbol}`);
            const binanceData = await binanceResponse.json();
            setBinancePrice(parseFloat(binanceData.price));

            const wazirxResponse = await fetch(`https://api.wazirx.com/sapi/v1/ticker/24hr?symbol=${coinSymbol.toLocaleLowerCase()}`);
            const wazirxData = await wazirxResponse.json();
            setWazirxPrice(parseFloat(wazirxData.lastPrice));

            // Check for price difference and simulate buying
            return
            if (binancePrice < wazirxPrice) {
                setIsBuying(true);

                // Simulate a buy process (adjust as needed)
                try {
                    // Simulate a test buy on Binance testnet
                    const binanceTestBuyResponse = await fetch('https://testnet.binance.vision/api/v3/order/test', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-MBX-APIKEY': binanceTestApiKey,
                        },
                        body: JSON.stringify({
                            symbol: 'BTCUSDT',
                            side: 'BUY',
                            type: 'MARKET',
                            quantity: 0.001, // Adjust quantity as needed
                        }),
                    });

                    if (binanceTestBuyResponse.ok) {
                        console.log('Test buy order on Binance testnet successful');
                    } else {
                        console.error('Error executing test buy order on Binance testnet');
                    }

                    // Simulate a test sell on WazirX testnet
                    const wazirxTestSellResponse = await fetch('https://api.wazirx.com/api/v2/sapi/order/test', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-MBX-APIKEY': wazirxTestApiKey,
                        },
                        body: `symbol=btcusdt&type=LIMIT&side=SELL&quantity=0.001&price=${wazirxPrice}`,
                    });

                    if (wazirxTestSellResponse.ok) {
                        console.log('Test sell order on WazirX testnet successful');
                    } else {
                        console.error('Error executing test sell order on WazirX testnet');
                    }
                } catch (error) {
                    console.error('Error simulating test buy/sell:', error);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(()=>{
        fetchPrices()
    },[selectedCoin])
    const containerStyle = {
        textAlign: 'center',
        margin: '20px',
    };

    const inputStyle = {
        width: '200px',
        padding: '10px',
        margin: '10px',
        fontSize: '18px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    };

    const selectStyle = {
        width: '200px',
        padding: '10px',
        margin: '10px',
        fontSize: '18px',
      };
    

    return (
        <div className="App" style={containerStyle}>
            <h1>Crypto Price Tracker</h1>
            <div>
                <label htmlFor="binancePrice">Binance {selectedCoin?.name} Price:</label>
                <input
                    type="text"
                    id="binancePrice"
                    value={binancePrice}
                    readOnly
                    style={inputStyle}
                />
            </div>
            <div>
                <label htmlFor="wazirxPrice">WazirX {selectedCoin?.name} Price:</label>
                <input
                    type="text"
                    id="wazirxPrice"
                    value={wazirxPrice}
                    readOnly
                    style={inputStyle}
                />
            </div>
            <div>
                <label htmlFor="difference">Price Difference:</label>
                <input
                    type="text"
                    id="difference"
                    value={wazirxPrice - binancePrice}
                    readOnly
                    style={inputStyle}
                />
            </div>
            <div>
                <label htmlFor="coinSelect">Select Coin:</label>
                <select
                    id="coinSelect"
                    value={selectedCoin?.symbol}
                    onChange={(e) => setSelectedCoin(coins.find(i => i.symbol === e.target.value))}
                    style={selectStyle}
                >
                    {coins.map((coin) => (
                        <option key={coin.symbol} value={coin.symbol}>
                            {coin.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={fetchPrices} style={buttonStyle}>
                Fetch Prices
            </button>
            {isBuying && <p>Simulating buying BTC from Binance and selling it on WazirX...</p>}
        </div>
    );
}

export default Tracker;
