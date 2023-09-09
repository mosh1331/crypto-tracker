import React, { useState } from 'react';

const Tracker=() =>{
  const [binancePrice, setBinancePrice] = useState('');
  const [wazirxPrice, setWazirxPrice] = useState('');

  const fetchPrices = async () => {
    try {
      const binanceResponse = await fetch('https://api3.binance.com/api/v3/avgPrice?symbol=BTCUSDT');
      const binanceData = await binanceResponse.json();
      setBinancePrice(binanceData.price);

      const wazirxResponse = await fetch('https://api.wazirx.com/sapi/v1/ticker/24hr?symbol=btcusdt');
      const wazirxData = await wazirxResponse.json();
      setWazirxPrice(wazirxData.lastPrice);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  return (
    <div className="App" style={containerStyle}>
      <h1>Crypto Price Tracker</h1>
      <div>
        <label htmlFor="binancePrice">Binance USDT Price:</label>
        <input
          type="text"
          id="binancePrice"
          value={binancePrice}
          readOnly
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="wazirxPrice">WazirX BTCUSDT Price:</label>
        <input
          type="text"
          id="wazirxPrice"
          value={wazirxPrice}
          readOnly
          style={inputStyle}
        />
      </div>
      <button onClick={fetchPrices} style={buttonStyle}>
        Fetch Prices
      </button>
    </div>
  );
}

export default Tracker;
