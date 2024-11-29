import { WstClockType } from "../hooks/useWstClock";
import { TimeInput } from "./TimeInput";

export const SettingView = (wstClock: { wstClock: WstClockType }) => {
  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="max-w-fit grid grid-cols-2 items-center">
          <div className="w-38">
            <p className="text-center">起床時間の予定</p>
          </div>
          <div className="w-32">
            <TimeInput
              timeMillisecond={wstClock.wstClock.wakeUpTime}
              setTimeMillisecond={wstClock.wstClock.handleChangeWakeUpTime}
            />
          </div>
        </div>
        <div className="max-w-fit grid grid-cols-2 items-center">
          <div>
            <p className="text-center">起床ボタン<br />リセット時間</p>
          </div>
          <div className="w-32">
            <TimeInput
              timeMillisecond={wstClock.wstClock.resetTime}
              setTimeMillisecond={wstClock.wstClock.handleChangeResetTime}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-2">
        <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg text-lg shadow-md w-64" onClick={wstClock.wstClock.wakeUp}>起床</button>
        <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg text-lg shadow-md w-64" onClick={wstClock.wstClock.save}>保存</button>
      </div>
    </div>
  );
}

