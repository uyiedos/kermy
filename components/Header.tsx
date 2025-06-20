/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';
// Agent, createNewAgent, addAgent, availablePresets, availablePersonal, setCurrent are no longer needed here
import { useAgent, useUI, useUser } from '@/lib/state';
// c from classnames is not needed if showRoomList is removed
// import c from 'classnames';
// useEffect, useState for showRoomList are removed
// import { useEffect, useState } from 'react';

export default function Header() {
  const { showUserConfig, setShowUserConfig } = useUI(); // setShowAgentEdit removed
  const { name: userName } = useUser(); // Renamed to avoid conflict with agent name
  const { current: currentAgent } = useAgent(); // Renamed for clarity
  // disconnect is not used here anymore if agent switching is removed
  // const { disconnect } = useLiveAPIContext();

  // Room list functionality is removed as Kermy is the only agent
  // let [showRoomList, setShowRoomList] = useState(false);
  // useEffect(() => {
  //   addEventListener('click', () => setShowRoomList(false));
  //   return () => removeEventListener('click', () => setShowRoomList(false));
  // }, []);

  // changeAgent and addNewChatterBot are removed
  // function changeAgent(agent: Agent | string) {
  //   disconnect();
  //   setCurrent(agent);
  // }
  // function addNewChatterBot() {
  //   disconnect();
  //   addAgent(createNewAgent());
  //   setShowAgentEdit(true);
  // }

  return (
    <header>
      <div className="roomInfo">
        <div className="roomName">
          {/* Removed dropdown, directly display current agent's name (Kermy) */}
          <h1>{currentAgent.name}</h1>
          {/* Removed Edit button */}
          {/*
          <button
            onClick={() => setShowAgentEdit(true)}
            className="button createButton"
          >
            <span className="icon">edit</span> Edit
          </button>
          */}
        </div>

        {/* Room list is removed */}
        {/*
        <div className={c('roomList', { active: showRoomList })}>
          ...
        </div>
        */}
      </div>

      <nav className="header-nav">
        <a href="#" className="nav-button">Home</a>
        <a href="#" className="nav-button">Chart</a>
        <a href="#" className="nav-button">Buy</a>
      </nav>

      <button
        className="userSettingsButton"
        onClick={() => setShowUserConfig(!showUserConfig)}
        aria-label={showUserConfig ? "Close user settings" : "Open user settings"}
        aria-expanded={showUserConfig}
      >
        <p className='user-name'>{userName || 'Your name'}</p>
        <span className="icon">tune</span>
      </button>
    </header>
  );
}