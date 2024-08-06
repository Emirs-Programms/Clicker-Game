import React, { useState, useEffect } from 'react';
import './App.css';

function Clicker() {
  const [time, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(time);
    setClicks(0);
    setIsRunning(true);
  };

  const handleReset = () => {
    setTime(0);
    setTimeLeft(0);
    setClicks(0);
    setIsRunning(false);
  };

  const handleClick = () => {
    if (isRunning) {
      setClicks((prevClicks) => prevClicks + 1);
    }
  };

  const clicksPerSecond = time > 0 ? (clicks / (time - timeLeft)).toFixed(2) : 0;

  return (
    <div className="container"> 
    
        <h1>Кликер</h1>
      <input
      className='input'
        type="number"
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
        disabled={isRunning}
      />
      <div className='all-BtnForm'>
      <button className='button' onClick={handleStart} disabled={isRunning}>Нажать</button>
       <button className='button' onClick={handleClick} disabled={!isRunning}>Клик</button>
      <button className='button' onClick={handleReset}>Reset</button>
      </div>
      <div>
        <p>Оставшееся время: {timeLeft}s</p>
        <p>Количество кликов: {clicks}</p>
        <p>Клики в секунду: {clicksPerSecond}</p>
      </div>
     
    </div>
  );
}

export default Clicker;