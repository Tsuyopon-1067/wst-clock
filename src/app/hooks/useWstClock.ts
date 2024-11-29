import { useCallback, useState } from "react";
import { useClock } from "./useClock"
import { useLocalStorage } from "./useLocalStorage";

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
  handleChangeRealWakeUpTime: () => void;
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
  const storedData = useLocalStorage<WstDates>("wstDates", { wakeUpTime: 0, realWakeUpTime: 0, resetTime: 0, isReseted: false });
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
    setWstDates({ ...wstDates, wakeUpTime });
  }, [setWstDates]);

  const wakeUp = useCallback(() => {
    const newRealWakeUpTime = Date.now() % ONE_DAY_MILLISECONDS;
    setWstDates({ ...wstDates, realWakeUpTime: newRealWakeUpTime });
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
