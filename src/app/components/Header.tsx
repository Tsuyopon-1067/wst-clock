import { Settings } from "lucide-react";

type HeaderProps = {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (value: boolean) => void;
}

export const Header = ({ isSettingsOpen, setIsSettingsOpen }: HeaderProps) => {
  return (
    <header className={'bg-blue-400 py-2 px-3 flex justify-between'}>
      <span className={'text-xl text-white font-bold'}>
        WST Clock
      </span>
      {
        isSettingsOpen ? (
          <button onClick={() => setIsSettingsOpen(false)}><span className="text-xl text-white font-bold px-1">X</span></button>
        ) : (
          <button onClick={() => setIsSettingsOpen(true)}><Settings color="white" /></button>
        )
      }
    </header>
  );
}
