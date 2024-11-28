'use client';

import { useState } from "react";
import TabSwitcher from "./TabSwitcher";
import { Header } from "./Header";
import { SettingView } from "./SettingView";

export const MainView = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <div>
      <Header isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
      {
        isSettingsOpen ? (
          <SettingView />
        ) : (
          <TabSwitcher />
        )
      }
    </div>
  );
}
