import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { NotesSidebar } from './NotesSidebar';

const TEST_NOTES = [
  { subject: 'SUBJECT 1', body: 'BODY 1', read: false },
  { subject: 'SUBJECT 2', body: 'BODY 2', read: true },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <NotesSidebar
      isLoading={false}
      onSelectNote={() => null}
      notes={TEST_NOTES}
      currentNoteIndex={0}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('Renders like the snapshot', () => {
  const tree = renderer
    .create(
      <NotesSidebar
        isLoading={false}
        onSelectNote={() => null}
        notes={TEST_NOTES}
        currentNoteIndex={0}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
