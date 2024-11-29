import { WstTime } from "../hooks/useWstClock";

export const Digital = ({ time }: { time: WstTime }) => {
  return (
    <div className="text-center">
      <span className="text-6xl font-black text-gray-700">
        {time.hour}:{time.minute}:{time.second}
      </span>
    </div>
  );
}
