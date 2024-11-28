import { useClockType } from "../hooks/useClock";

export const Digital = ({ time }: { time: useClockType }) => {
  return (
    <div>
      {time.hour}:{time.minute}:{time.second}
    </div>
  );
}
