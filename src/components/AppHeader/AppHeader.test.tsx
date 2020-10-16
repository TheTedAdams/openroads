import React from 'react';
import ReactDOM from 'react-dom';

import { AppHeader } from './AppHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppHeader isLoading={false} unreadCount={0} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
