import './NotesSidebar.scss';

import React, { FC, useCallback } from 'react';
import { Note } from '../../models';
import { NotesSidebarItem } from './parts/NotesSidebarItem';

interface NotesSidebarProps {
  isLoading: boolean;
  notes: Note[];
  onSelectNote: (noteIndex: number) => void;
  currentNoteIndex: number;
}

export const NotesSidebar: FC<NotesSidebarProps> = ({
  isLoading,
  notes,
  onSelectNote,
  currentNoteIndex,
}) => {
  const handleSelect = useCallback((index: number) => onSelectNote(index), [
    onSelectNote,
  ]);

  return (
    <section className="NotesSidebar">
      <h2 className="NotesSidebar-title">Available Notes:</h2>
      <div className="NotesSidebar-list">
        {isLoading ? (
          <p className="NotesSidebar-message">Loading...</p>
        ) : (
          notes.map((note, index) => (
            <NotesSidebarItem
              key={note.subject} // I would assume in a real app this would be note.id, as subject is not guaranteed to be unique. -TedA
              note={note}
              isSelected={index === currentNoteIndex}
              index={index}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>
    </section>
  );
};
