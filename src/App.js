import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState('');
  const [countdownInterval, setCountdownInterval] = useState(null);

  useEffect(() => {
    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  }, []);

  const handleInputChange = (event) => {
    setTargetDate(event.target.value);
  };

  const startCountdown = () => {
    const targetDateTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const distance = targetDateTime - now;

    if (distance <= 0) {
      alert('Please select a future date and time.');
      return;
    }

    setCountdownInterval(setInterval(updateCountdown, 1000));
    updateCountdown();
  };

  const updateCountdown = () => {
    const targetDateTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const distance = targetDateTime - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      setCountdown('The countdown is over! What\'s next on your adventure?');
      return;
    }

    if (distance > 100 * 24 * 60 * 60 * 1000) {
      clearInterval(countdownInterval);
      setCountdown('Count down is greater than 100');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  };

  const stopCountdown = () => {
    clearInterval(countdownInterval);
    setCountdown('');
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div className="input-container">
        <input
          type="datetime-local"
          value={targetDate}
          onChange={handleInputChange}
        />
       
      </div>
      <div className="button-container">
      <button onClick={startCountdown}>Start Timer</button>
      </div>
      {typeof countdown === 'string' ? (
        <div className="countdown-message">
          {countdown}
        </div>
      ) : (
        <div className="countdown-container">
          <div className="countdown-box">
            <div className="countdown-value">{countdown.days}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-box">
            <div className="countdown-value">{countdown.hours}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-box">
            <div className="countdown-value">{countdown.minutes}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-box">
            <div className="countdown-value">{countdown.seconds}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
