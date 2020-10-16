import React from 'react';
import ReactDOM from 'react-dom';

import { NotesSidebar } from './NotesSidebar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <NotesSidebar
      isLoading={false}
      onSelectNote={() => null}
      notes={[]}
      currentNoteIndex={0}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
