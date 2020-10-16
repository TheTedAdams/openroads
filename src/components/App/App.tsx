import './App.scss';

import classNames from 'classnames';
import * as React from 'react';

// your editor might show these svg imports as errors "Cannot find module", safe to ignore
import checkMark from './check-mark.svg';
import logo from './logo.svg';
import { Note } from '../../models';

interface AppState {
  notes: Note[];
  currentNoteIndex: number;
  loading: boolean;
}

class App extends React.Component<any, AppState> {
  private async loadNotesIntoState() {
    const notes = await fetch(
      `${process.env.REACT_APP_API_URI}/notes`
    ).then((response) => response.json());
    this.setState((state) => ({ ...state, loading: false, notes }));
  }

  constructor(props: any) {
    super(props);

    this.state = {
      notes: [],
      currentNoteIndex: 0,
      loading: true,
    };
  }

  // Changing to componentDidMount per current react recommendations (Warning in console) -TedA
  componentDidMount() {
    // TODO fetch notes and push them into state.
    this.loadNotesIntoState();
  }

  // TODO this callback isn't working
  // Two ways to fix this. .bind'ing the function in constructor, or changing it to an arrow function
  // Both methods have the effect of setting `this` to be the component instance
  // Preferences could be decided as a team style decision.
  // Personally I like doing it this way as it doesn't clutter the constructor and is fixed in the same
  // place as the function definition, rather than having to remember to go add the .bind call to the
  // constructor every time I add a new method to the class
  markAsRead = () => {
    this.setState((currentState: any) => {
      let marked = {
        ...currentState.notes[currentState.currentNoteIndex],
        read: true,
      };
      let notes = [...currentState.notes];
      notes[currentState.currentNoteIndex] = marked;
      return { ...currentState, notes };
    });
  };

  selectNote = (e: any) => {
    this.setState({ currentNoteIndex: e.currentTarget.id });
  };

  getNotesRows() {
    // TODO fix the selected row highlight, which breaks on subsequent clicks to the sidebar.
    return this.state.notes.map((note: any) => (
      <div
        key={note.subject}
        className={classNames('NotesSidebarItem', {
          selected:
            this.state.notes.indexOf(note) === this.state.currentNoteIndex,
        })}
        onClick={this.selectNote}
        id={String(this.state.notes.indexOf(note))}
      >
        <h4 className="NotesSidebarItem-title">{note.subject}</h4>
        {note.read && <img alt="Check Mark" src={checkMark} />}
      </div>
    ));
  }

  // TODO this component should be broken into separate components.

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Notes Viewer Test App</h1>
          <div>
            Unread:
            <span className="App-title-unread-count">
              {/* TODO this should be a count of only the unread messages */}
              {this.state.notes.length}
            </span>
          </div>
        </header>
        <section className="NotesSidebar">
          <h2 className="NotesSidebar-title">Available Notes:</h2>
          <div className="NotesSidebar-list">{this.getNotesRows()}</div>
        </section>
        <section className="NoteDetails">
          {/* While 0 is falsey, React will render it, so using .length for logic in JSX is not safe. */}
          {this.state.notes.length > 0 && (
            <h3 className="NoteDetails-title">
              {this.state.notes[this.state.currentNoteIndex].subject}
            </h3>
          )}
          {this.state.notes.length > 0 && (
            <p className="NoteDetails-subject">
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
