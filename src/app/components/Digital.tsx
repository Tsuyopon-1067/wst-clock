import { WstTime } from "../hooks/useWstClock";

export const Digital = ({ time }: { time: WstTime }) => {
  return (
    <div className="text-center">
      <span className="text-6xl font-black text-gray-700">
        {time.hour}:{time.minute}:{time.second}
      </span>
      <span className='ml-1 font-bold'>WST</span>
    </div>
  );
}
