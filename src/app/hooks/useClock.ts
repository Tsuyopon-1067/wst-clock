import { useEffect, useMemo, useState } from 'react';

export type useClockType = {
  unix: number;
  hour: string;
  minute: string;
  second: string;
};

export const useClock = () => {
  const [time, setTime] = useState(new Date());

  const DURATION = useMemo(() => 1000 / 60, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      if (time.getSeconds() !== newDate.getSeconds()) {
        setTime(newDate);
      }
    }, DURATION);

    return () => clearInterval(intervalId);
  }, [time, DURATION]);

  return useMemo(
    () => ({
      unix: time.getTime(),
      hour: time.getHours().toString(),
      minute: time.getMinutes().toString().padStart(2, '0'),
      second: time.getSeconds().toString().padStart(2, '0'),
    }),
    [time]
  );
};

