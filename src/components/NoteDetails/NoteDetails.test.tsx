import React from 'react';
import ReactDOM from 'react-dom';

import { NoteDetails } from './NoteDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <NoteDetails
      isLoading={false}
      onMarkAsRead={() => null}
      selectedNote={{ subject: 'SUBJECT', body: 'BODY', read: false }}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
