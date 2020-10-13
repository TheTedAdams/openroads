import './App.scss';

import classNames from 'classnames';
import * as React from 'react';

// your editor might show these svg imports as errors "Cannot find module", safe to ignore
import checkMark from './check-mark.svg';
import logo from './logo.svg';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      notes: [],
      currentNoteIndex: 0
    };
  }

  componentWillMount() {
    // TODO fetch notes and push them into state.
  }

  // TODO this callback isn't working
  markAsRead() {
    this.setState((currentState: any) => {
      let marked = {
        ...currentState.notes[currentState.currentNoteIndex],
        read: true
      };
      let notes = [...currentState.notes];
      notes[currentState.currentNoteIndex] = marked;
      return { ...currentState, notes };
    });
  }

  // TODO this callback isn't working
  selectNote(e: any) {
    this.setState({ currentNoteIndex: e.currentTarget.id });
  }

  getNotesRows() {
    // TODO fix the selected row highlight, which breaks on subsequent clicks to the sidebar.
    return this.state.notes.map((note: any) => (
      <div
        key={note.subject}
        className={classNames('NotesSidebarItem', {
          selected: this.state.notes.indexOf(note) === this.state.currentNoteIndex
        })}
        onClick={this.selectNote}
        id={this.state.notes.indexOf(note)}
      >
        <h4 className='NotesSidebarItem-title'>{note.subject}</h4>
        {note.read && <img alt='Check Mark' src={checkMark} />}
      </div>
    ));
  }

  // TODO this component should be broken into separate components.

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Notes Viewer Test App</h1>
          <div>
            Unread:
            <span className='App-title-unread-count'>
              {/* TODO this should be a count of only the unread messages */}
              {this.state.notes.length}
            </span>
          </div>
        </header>
        <section className='NotesSidebar'>
          {/* TODO this section should be rendered as a sidebar, left of the NoteDetails, taking up
        the full height of the space beneath the header. */}
          <h2 className='NotesSidebar-title'>Available Notes:</h2>
          <div className='NotesSidebar-list'>{this.getNotesRows()}</div>
        </section>
        <section className='NoteDetails'>
          {/* TODO some rendering bugs in here when list is empty */}
          {this.state.notes.length && (
            <h3 className='NoteDetails-title'>
              {this.state.notes[this.state.currentNoteIndex].subject}
            </h3>
          )}
          {this.state.notes.length && (
            <p className='NoteDetails-subject'>
              {this.state.notes[this.state.currentNoteIndex].body}
            </p>
          )}
          <button onClick={this.markAsRead}>Mark as read</button>
        </section>
      </div>
    );
  }
}

export default App;
