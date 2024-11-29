import { useCallback, useState } from "react";
import { useClock } from "./useClock";
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
  handleChangeResetTime: (resetTime: number) => void;
  wakeUpTime: number;
  resetTime: number;
  isReseted: boolean;
  save: () => void;
  wakeUp: () => void;
};

type WstDates = {
  wakeUpTime: number;
  realWakeUpTime: number;
  resetTime: number;
  nextResetTime: number;
};

export const useWstClock = (): WstClockType => {
  const ONE_DAY_MILLISECONDS = 86400000;
  const clock = useClock();
  const realTime = clock.unix;

  const initialState = {
    wakeUpTime: 6 * 3600 * 1000,
    realWakeUpTime: 6 * 3600 * 1000 + new Date().getTimezoneOffset() * 60000,
    resetTime: 4 * 3600 * 1000,
    nextResetTime: 0,
  };
  const getInitialState = () => {
    if (typeof window === "undefined") {
      return initialState;
    }
    return storedData.storedValue;
  };
  const storedData = useLocalStorage<WstDates>("wstDates", initialState);
  const [wstDates, setWstDates] = useState<WstDates>(getInitialState);
  const localRealWakeUpTime =
    (wstDates.realWakeUpTime - new Date().getTimezoneOffset() * 60000) %
    ONE_DAY_MILLISECONDS;
  const wstTimeDate = new Date(
    realTime - localRealWakeUpTime + wstDates.wakeUpTime
  );

  const toDateStr = useCallback((date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];
    const dateOfWeek = dateOfWeekList[date.getDay()];
    return `${month}月${day}日（${dateOfWeek}）`;
  }, []);

  const wstTime = {
    hour: wstTimeDate.getHours().toString(),
    minute: wstTimeDate.getMinutes().toString().padStart(2, "0"),
    second: wstTimeDate.getSeconds().toString().padStart(2, "0"),
    unix: wstTimeDate.getTime(),
    date: toDateStr(wstTimeDate),
    year: wstTimeDate.getFullYear(),
    reiwa: wstTimeDate.getFullYear() - 2018,
  };

  const handleChangeWakeUpTime = useCallback(
    (wakeUpTime: number) => {
      setWstDates({ ...wstDates, wakeUpTime });
    },
    [setWstDates, wstDates]
  );

  const wakeUp = useCallback(() => {
    const newRealWakeUpTime = Date.now();
    const newNextResetTime = calcNextResetTime(newRealWakeUpTime);
    const newWstDates = {
      ...wstDates,
      realWakeUpTime: newRealWakeUpTime,
      nextResetTime: newNextResetTime,
    };
    setWstDates(newWstDates);
    storedData.setValue(newWstDates);
  }, [setWstDates, wstDates, storedData]);

  const handleChangeResetTime = useCallback(
    (resetTime: number) => {
      setWstDates({ ...wstDates, resetTime });
    },
    [setWstDates, wstDates]
  );

  const calcNextResetTime = useCallback(
    (realWakeUpTime: number) => {
      const date = new Date();
      const offset = date.getTimezoneOffset() * 60000;
      const localMillisec = date.getTime() + offset;
      const zeroTime =
        localMillisec - (localMillisec % ONE_DAY_MILLISECONDS) + offset;
      if (zeroTime + wstDates.resetTime < realWakeUpTime) {
        return zeroTime + ONE_DAY_MILLISECONDS + wstDates.resetTime;
      }
      return zeroTime + wstDates.resetTime;
    },
    [wstDates]
  );

  const save = () => {
    wstDates.nextResetTime = calcNextResetTime(wstDates.realWakeUpTime);
    storedData.setValue(wstDates);
  };

  const isReseted = () => {
    const localNextResetTime = wstDates.nextResetTime;
    if (wstDates.realWakeUpTime === 0 || wstDates.nextResetTime === 0) {
      return false;
    }
    if (new Date().getTime() < localNextResetTime) {
      return true;
    }
    return false;
  };

  return {
    wstTime,
    handleChangeWakeUpTime,
    wakeUp,
    handleChangeResetTime,
    wakeUpTime: wstDates.wakeUpTime,
    resetTime: wstDates.resetTime,
    isReseted: isReseted(),
    save,
  };
};
