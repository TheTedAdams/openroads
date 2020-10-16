import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { NoteDetails } from './NoteDetails';

const TEST_NOTE = { subject: 'SUBJECT', body: 'BODY', read: false };

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <NoteDetails
      isLoading={false}
      onMarkAsRead={() => null}
      selectedNote={TEST_NOTE}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('Renders like the snapshot', () => {
  const tree = renderer
    .create(
      <NoteDetails
        isLoading={false}
        onMarkAsRead={() => null}
        selectedNote={TEST_NOTE}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
