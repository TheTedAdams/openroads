import './AppHeader.scss';

import React, { FC } from 'react';
import logo from './logo.svg';

interface AppHeaderProps {
  isLoading: boolean;
  unreadCount: number;
}

export const AppHeader: FC<AppHeaderProps> = ({ isLoading, unreadCount }) => {
  return (
    <header className="AppHeader">
      {/* Just wanted to call out that having padding embedded in the svg is probably not ideal.
       ** I would get the padding removed from the svg and then put align-items: center on the heading instead of the
       ** current mixture of padding and margin (and padding embedded inside the svg). This would make it much more easy
       ** adjust things later.
       */}
      <img src={logo} className="AppHeader-logo" alt="logo" />
      <h1 className="AppHeader-title">Notes Viewer Test App</h1>
      <div>
        Unread:
        <span className="AppHeader-title-unread-count">
          {/* Adding .toLocaleString() because this gives us great freebie handling for 4+ digit numbers */}
          {isLoading ? '-' : (unreadCount ?? 0).toLocaleString()}
        </span>
      </div>
    </header>
  );
};
