
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';

interface LaunchTimerProps {
  targetDate: Date;
}

const LaunchTimer: React.FC<LaunchTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [launched, setLaunched] = useState(+targetDate - +new Date() <= 0);

  useEffect(() => {
    if (launched) return;

    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (+targetDate - +new Date() <= 0) {
        setLaunched(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="launch-timer-container">
      <h2 className="launch-timer-title">$KERMY LAUNCH COUNTDOWN</h2>
      {launched ? (
        <div className="launched-message">WE'RE LIVE! 🚀🐸</div>
      ) : (
        <div className="timer">
          <div className="timer-segment">
            <span className="timer-value">{formatTime(timeLeft.days)}</span>
            <span className="timer-label">Days</span>
          </div>
          <div className="timer-segment">
            <span className="timer-value">{formatTime(timeLeft.hours)}</span>
            <span className="timer-label">Hours</span>
          </div>
          <div className="timer-segment">
            <span className="timer-value">{formatTime(timeLeft.minutes)}</span>
            <span className="timer-label">Minutes</span>
          </div>
          <div className="timer-segment">
            <span className="timer-value">{formatTime(timeLeft.seconds)}</span>
            <span className="timer-label">Seconds</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchTimer;
