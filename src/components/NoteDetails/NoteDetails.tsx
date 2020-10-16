import './NoteDetails.scss';

import React, { FC } from 'react';
import { Note } from '../../models';

interface NoteDetailsProps {
  isLoading: boolean;
  selectedNote: Note;
  onMarkAsRead: () => void;
}

export const NoteDetails: FC<NoteDetailsProps> = ({
  isLoading,
  selectedNote,
  onMarkAsRead,
}) => {
  return (
    <section className="NoteDetails">
      {isLoading ? (
        <p>Loading...</p>
      ) : !selectedNote ? (
        <p>No note selected.</p>
      ) : (
        <>
          <h3 className="NoteDetails-title">{selectedNote.subject}</h3>
          <p className="NoteDetails-subject">{selectedNote.body}</p>
          <button onClick={onMarkAsRead}>Mark as read</button>
        </>
      )}
    </section>
  );
};
