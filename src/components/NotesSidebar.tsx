import * as React from 'react';
import { INote, INotesSideProps } from "../types/types"

import classNames from 'classnames';
import checkMark from '../images/check-mark.svg';

class NotesSidebar extends React.Component<INotesSideProps> {
  getNotesRows() {
    // fixed: selected row highlight
    const { currentIndex, notes, onSelectNote } = this.props 
    return notes.map((note: INote) => (
      <div
        key={note.subject}
        className={classNames('NotesSidebarItem', {
          selected: notes.indexOf(note).toString() === currentIndex.toString() 
        })}
        onClick={onSelectNote}
        id={notes.indexOf(note).toString()}
      >
        <h4 className='NotesSidebarItem-title'>{note.subject}</h4>
        {note.read && <img alt='Check Mark' src={checkMark} />}
      </div>
    ));
  }
  render() {
    return(
      <section className='NotesSidebar'>
        {/* fixed: layout of notesSidebar, left of the NoteDetails, taking up
        the full height of the space beneath the header. */}
        <h2 className='NotesSidebar-title'>Available Notes:</h2>
        <div>{this.getNotesRows()}</div>
      </section>
    );
  }
}

export default NotesSidebar;