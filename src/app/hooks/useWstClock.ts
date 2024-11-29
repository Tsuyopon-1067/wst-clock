import { useCallback, useMemo, useState } from 'react';
import { useClock } from './useClock'
import { useLocalStorage } from './useLocalStorage';

export type WstTime = {
  hour: string;
  minute: string;
  second: string;
  unix: number;
  date: string;
  year: number;
  reiwa: number;
};

export type WstClockType = {
  wstTime: WstTime;
  handleChangeWakeUpTime: (wakeUpTime: number) => void;
  handleChangeResetTime: (resetTime: number) => void;
  wakeUpTime: number;
  resetTime: number;
  isReseted: boolean;
  save: () => void;
  wakeUp: () => void;
}

type WstDates = {
  wakeUpTime: number;
  realWakeUpTime: number;
  resetTime: number;
  isReseted: boolean;
}

export const useWstClock = (): WstClockType => {
  const ONE_DAY_MILLISECONDS = 86400000;
  const clock = useClock();
  const realTime = clock.unix;

  const storedData = useLocalStorage<WstDates>('wstDates', { wakeUpTime: 6 * 3600 * 1000, realWakeUpTime: 6 * 3600 * 1000, resetTime: 4 * 3600 * 1000, isReseted: false });
  const [wstDates, setWstDates] = useState<WstDates>(storedData.storedValue);
  const wstTimeDate = new Date(realTime - wstDates.realWakeUpTime + wstDates.wakeUpTime);

  const toDateStr = useCallback((date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateOfWeekList = ['日', '月', '火', '水', '木', '金', '土'];
    const dateOfWeek = dateOfWeekList[date.getDay()];
    return `${month}月${day}日（${dateOfWeek}）`;
  }, []);

  const wstTime = {
    hour: wstTimeDate.getHours().toString(),
    minute: wstTimeDate.getMinutes().toString().padStart(2, '0'),
    second: wstTimeDate.getSeconds().toString().padStart(2, '0'),
    unix: wstTimeDate.getTime(),
    date: toDateStr(wstTimeDate),
    year: wstTimeDate.getFullYear(),
    reiwa: wstTimeDate.getFullYear() - 2018,
  }

  const handleChangeWakeUpTime = useCallback((wakeUpTime: number) => {
    storedData.setValue({ ...wstDates, wakeUpTime });
  }, [setWstDates]);

  const wakeUp = useCallback(() => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const newRealWakeUpTime = Date.now() % ONE_DAY_MILLISECONDS - offset;
    const newWstDates = { ...wstDates, realWakeUpTime: newRealWakeUpTime, isReseted: true };
    setWstDates(newWstDates);
    storedData.setValue(newWstDates);
  }, [setWstDates]);

  const handleChangeResetTime = useCallback((resetTime: number) => {
    setWstDates({ ...wstDates, resetTime });
  }, [setWstDates]);

  const save = () => {
    storedData.setValue(wstDates);
  };

  return {
    wstTime,
    handleChangeWakeUpTime,
    wakeUp,
    handleChangeResetTime,
    isReseted: wstDates.isReseted,
    wakeUpTime: wstDates.wakeUpTime,
    resetTime: wstDates.resetTime,
    save,
  };
};
