'use client';

import { useState } from "react";
import TabSwitcher from "./TabSwitcher";
import { Header } from "./Header";
import { SettingView } from "./SettingView";
import { useWstClock } from "../hooks/useWstClock";

export const MainView = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const wstClock = useWstClock();
  return (
    <div>
      <Header isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
      {
        isSettingsOpen ? (
          <SettingView wstClock={wstClock} />
        ) : (
          <TabSwitcher wstClock={wstClock} />
        )
      }
    </div>
  );
}
