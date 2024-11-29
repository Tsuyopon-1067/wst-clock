'use client';

import { useState } from 'react';
import TabSwitcher from './TabSwitcher';
import { Header } from './Header';
import { SettingView } from './SettingView';
import { useWstClock } from '../hooks/useWstClock';

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
      <div className='flex justify-center gap-3 items-center'>
        <div className='flex flex-col w-fit pl-2'>
          <span className='text-gray-700 text-sm font-bold whitespace-nowrap'>令和{wstClock.wstTime.reiwa}年</span>
          <span className='text-gray-700 text-sm font-bold whitespace-nowrap'>{wstClock.wstTime.year}年</span>
        </div>
        <span className='text-gray-700 font-bold' style={{ 'fontSize': '2.3rem' }}>
          {wstClock.wstTime.date}
        </span>
      </div>
    </div >
  );
}
