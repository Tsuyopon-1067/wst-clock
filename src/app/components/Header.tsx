import { Settings } from "lucide-react";

type HeaderProps = {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (value: boolean) => void;
}

export const Header = ({ isSettingsOpen, setIsSettingsOpen }: HeaderProps) => {
  return (
    <header>
      <div>hogehoge</div>
      {
        isSettingsOpen ? (
          <button onClick={() => setIsSettingsOpen(false)}>x</button>
        ) : (
          <button onClick={() => setIsSettingsOpen(true)}><Settings /></button>
        )
      }
    </header>
  );
}
