'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 text-center max-w-2xl mx-auto">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-xl">
          <div className="text-4xl font-bold text-white mb-2">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-300 uppercase tracking-wide">
            {key}
          </div>
        </div>
      ))}
    </div>
  );
}
