import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { AppHeader } from './AppHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppHeader isLoading={false} unreadCount={0} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Renders like the snapshot', () => {
  const tree = renderer
    .create(<AppHeader isLoading={false} unreadCount={0} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
