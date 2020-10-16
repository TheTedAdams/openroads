import classNames from 'classnames';
import React, { FC, useCallback } from 'react';
import { Note } from '../../../models';
import checkMark from '../check-mark.svg';

interface NotesSidebarItemProps {
  note: Note;
  isSelected: boolean;
  index: number;
  onSelect: (index: number) => void;
}

export const NotesSidebarItem: FC<NotesSidebarItemProps> = ({
  note,
  isSelected,
  index,
  onSelect,
}) => {
  const handleClick = useCallback(() => onSelect(index), [onSelect, index]);

  // There's some pretty big accessibility problems here that I would tackle in a real app.
  // Clickable <div> should be replaced with a proper aria tab implementation
  // To at least fix the worst of it I'm swapping the div for a button so that we get keyboard interaction
  return (
    <button
      key={note.subject} // I would assume in a real app this would be note.id, as subject is not guaranteed to be unique. -TedA
      onClick={handleClick}
      className={classNames('NotesSidebarItem', { selected: isSelected })}
    >
      <h4 className="NotesSidebarItem-title">{note.subject}</h4>
      {note.read && <img alt="Check Mark" src={checkMark} />}
    </button>
  );
};
