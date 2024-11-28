import { useCallback, useState } from "react";
import { useClock, useClockType } from "./useClock"
import { useLocalStorage } from "./useLocalStorage";

type WstClockType = {
  wstTime: useClockType;
  handleChangeWakeUpTime: (wakeUpTime: number) => void;
  handleChangeRealWakeUpTime: () => void;
  handleChangeResetTime: (resetTime: number) => void;
  isReseted: boolean;
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
  const wstTime = {
    hour: wstTimeDate.getHours().toString(),
    minute: wstTimeDate.getMinutes().toString().padStart(2, '0'),
    second: wstTimeDate.getSeconds().toString().padStart(2, '0'),
    unix: wstTimeDate.getTime(),
  }

  const handleChangeWakeUpTime = useCallback((wakeUpTime: number) => {
    setWstDates({ ...wstDates, wakeUpTime });
  }, [setWstDates]);
  const handleChangeRealWakeUpTime = useCallback(() => {
    const newRealWakeUpTime = Date.now() % ONE_DAY_MILLISECONDS;
    setWstDates({ ...wstDates, realWakeUpTime: newRealWakeUpTime });
  }, [setWstDates]);
  const handleChangeResetTime = useCallback((resetTime: number) => {
    setWstDates({ ...wstDates, resetTime });
  }, [setWstDates]);

  return {
    wstTime,
    handleChangeWakeUpTime,
    handleChangeRealWakeUpTime,
    handleChangeResetTime,
    isReseted: wstDates.isReseted,
  };
};
