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
          <p>Loading...</p>
        ) : (
          notes.map((note, index) => (
            <NotesSidebarItem
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
