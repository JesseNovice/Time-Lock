"use client"
import React from 'react';
import { useTimer } from 'react-timer-hook';

const CountdownClock = () => {
  // Set the expiration timestamp based on the current time plus the desired duration
  const time = new Date();
  time.setDate(time.getDate() + 91); // 302 days
  time.setHours(time.getHours() + 4); // 2 hours
  time.setMinutes(time.getMinutes() + 9); // 59 minutes
  time.setSeconds(time.getSeconds() + 59); // 59 seconds

  const {
    seconds,
    minutes,
    hours,
    days,
  } = useTimer({ expiryTimestamp: time, onExpire: () => console.warn('onExpire called') });

  return (
    <div className='countdown ul_li_center'>
      <div className="single">
        <h1>{days}</h1>
        <p>days</p>
      </div>
      <div className="single">
        <h1>{hours}</h1>
        <p>hours</p>
      </div>
      <div className="single">
        <h1>{minutes}</h1>
        <p>mins</p>
      </div>
      <div className="single">
        <h1>{seconds}</h1>
        <p>secs</p>
      </div>
    </div>
  );
}

export default CountdownClock;