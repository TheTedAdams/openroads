import * as React from 'react';
import { INotesDetailsProps } from "../types/types"

class NoteDetails extends React.Component<INotesDetailsProps> {
  render() {
    const { notes, currentIndex, markAsRead } = this.props
    return(
      <section className='NoteDetails'>
        {/* fixed: rendering bugs when list is empty */}
        {notes.length > 0 && (
          <>
            <h3 className='NoteDetails-title'>{notes[currentIndex].subject}</h3>
            <p>{notes[currentIndex].body}</p>
            <button disabled={notes[currentIndex].read === true} onClick={markAsRead}>Mark as read</button>
          </>
        )}
      </section>
    );
  }
}

export default NoteDetails