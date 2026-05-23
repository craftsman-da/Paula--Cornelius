import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Paula & Cornelius wedding: July 20, 2026 at 12:00 Noon EDT (UTC-4)
    const weddingDate = new Date('2026-07-20T12:00:00-04:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <div className='flex gap-2 sm:gap-3 md:gap-5 lg:gap-6 justify-center px-4 w-full max-w-xl mx-auto'>
      {units.map(({ value, label }, idx) => (
        <div
          key={label}
          className='rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 min-w-[58px] sm:min-w-[68px] md:min-w-[85px] text-center shadow-lg flex-1 max-w-[78px] sm:max-w-[88px] md:max-w-none relative overflow-hidden'
          style={{
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.35)',
            animationDelay: `${idx * 0.1}s`,
          }}
        >
          {/* Gold shimmer top line */}
          <div
            className='absolute top-0 left-0 w-full h-0.5'
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          />
          <div
            className='text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tabular-nums'
            style={{ color: 'white', textShadow: '0 0 20px rgba(0,0,0,0.4)' }}
          >
            {String(value).padStart(2, '0')}
          </div>
          <div
            className='text-[9px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 uppercase tracking-widest font-medium'
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
