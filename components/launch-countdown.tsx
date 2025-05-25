"use client";

import { useEffect, useState } from 'react';

export default function LaunchCountdown() {
  const [days, setDays] = useState(20);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timer);
        return;
      }

      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds]);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg mb-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Thank you for being an early adopter!
        </h2>
        <p className="text-sm mb-4">
          Core Analytics is launching in:
        </p>
        <div className="flex justify-center items-center space-x-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{days}</div>
            <div className="text-xs uppercase">Days</div>
          </div>
          <div className="text-2xl font-bold">:</div>
          <div className="text-center">
            <div className="text-3xl font-bold">{hours.toString().padStart(2, '0')}</div>
            <div className="text-xs uppercase">Hours</div>
          </div>
          <div className="text-2xl font-bold">:</div>
          <div className="text-center">
            <div className="text-3xl font-bold">{minutes.toString().padStart(2, '0')}</div>
            <div className="text-xs uppercase">Minutes</div>
          </div>
          <div className="text-2xl font-bold">:</div>
          <div className="text-center">
            <div className="text-3xl font-bold">{seconds.toString().padStart(2, '0')}</div>
            <div className="text-xs uppercase">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
