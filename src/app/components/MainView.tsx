'use client';

import { useState } from 'react';
import TabSwitcher from './TabSwitcher';
import { Header } from './Header';
import { SettingView } from './SettingView';
import { useWstClock } from '../hooks/useWstClock';
import { XShareButton } from './XShareButton';

export const MainView = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const wstClock = useWstClock();
  const postText = `私は今，${wstClock.wstTime.hour}時${wstClock.wstTime.minute}分${wstClock.wstTime.second}秒（WST標準時）で生きています．`;
  return (
    <div>
      <Header isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
      <main>
        {
          isSettingsOpen ? (
            <SettingView wstClock={wstClock} />
          ) : (
            <div>
              <TabSwitcher wstClock={wstClock} />
              <div className='mx-2'>
                <div className='flex justify-center gap-3 items-center my-4'>
                  <div className='flex flex-col w-fit pl-2'>
                    <span className='text-gray-700 text-sm font-bold whitespace-nowrap'>令和{wstClock.wstTime.reiwa}年</span>
                    <span className='text-gray-700 text-sm font-bold whitespace-nowrap'>{wstClock.wstTime.year}年</span>
                  </div>
                  <span className='text-gray-700 font-bold' style={{ 'fontSize': '2.3rem' }}>
                    {wstClock.wstTime.date}
                  </span>
                </div>
                {
                  !wstClock.isReseted && (
                    <button
                      className='w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg text-2xl shadow-md w-64 tracking-widest'
                      onClick={wstClock.wakeUp}
                    >
                      <span className='pr-8'>起</span>
                      <span className='pl-8'>床</span>
                    </button>
                  )
                }
                <div className='flex justify-end mx-3'>
                  <XShareButton text={postText} />
                </div>
              </div>
            </div>
          )
        }
      </main>
    </div >
  );
}
