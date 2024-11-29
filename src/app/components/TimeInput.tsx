type TimeInputProps = {
  timeMillisecond: number;
  setTimeMillisecond: (timeMillisecond: number) => void;
};

export const TimeInput = ({ timeMillisecond, setTimeMillisecond }: TimeInputProps) => {
  const hour = Math.floor(timeMillisecond / (60 * 60 * 1000));
  const minute = Math.floor((timeMillisecond % (60 * 60 * 1000)) / (60 * 1000));

  const setMillisecondHelper = (hour: number, minute: number) => {
    setTimeMillisecond(hour * 60 * 60 * 1000 + minute * 60 * 1000);
  };

  const adjustHour = (delta: number) => {
    let newHour = hour + delta;
    if (newHour > 23) newHour = 0;
    if (newHour < 0) newHour = 23;
    setMillisecondHelper(newHour, minute);
  };

  const adjustMinute = (delta: number) => {
    let newMinute = minute + delta;
    if (newMinute > 59) newMinute = 0;
    if (newMinute < 0) newMinute = 59;
    setMillisecondHelper(hour, newMinute);
  };

  const handleHourInput = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0 && num <= 23) {
      setMillisecondHelper(num, minute);
    }
  };

  const handleMinuteInput = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0 && num <= 59) {
      setMillisecondHelper(hour, num);
    }
  };

  return (
    <div className={'my-2'}>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <button
            className="w-8 h-8 bg-blue-400 text-gray-100 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center"
            onClick={() => adjustHour(1)}
          >
            ▲
          </button>
          <input
            type="text"
            value={hour.toString().padStart(2, '0')}
            onChange={(e) => handleHourInput(e.target.value)}
            className="w-12 text-center border rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-8 h-8 bg-blue-400 text-gray-100 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center"
            onClick={() => adjustHour(-1)}
          >
            ▼
          </button>
        </div>
        <span className="text-xl font-bold">:</span>
        <div className="flex flex-col items-center gap-1">
          <button
            className="w-8 h-8 bg-blue-400 text-gray-100 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center"
            onClick={() => adjustMinute(1)}
          >
            ▲
          </button>
          <input
            type="text"
            value={minute.toString().padStart(2, '0')}
            onChange={(e) => handleMinuteInput(e.target.value)}
            className="w-12 text-center border rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-8 h-8 bg-blue-400 text-gray-100 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center"
            onClick={() => adjustMinute(-1)}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};
