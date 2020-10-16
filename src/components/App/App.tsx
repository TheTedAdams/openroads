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
  errorMessage?: string;
}

class App extends React.Component<any, AppState> {
  private async loadNotesIntoState() {
    try {
      const notes = await fetch(
        `${process.env.REACT_APP_API_URI}/notes`
      ).then((response) => response.json());
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulating loading time to test loading state
      this.setState((state) => ({ ...state, loading: false, notes }));
    } catch (e) {
      this.setState((state) => ({
        ...state,
        loading: false,
        errorMessage: 'Failed to load notes.',
      }));
      console.error('Failed to load notes', e);
    }
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

  selectNote: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    this.setState({ currentNoteIndex: Number(e.currentTarget.id) });
  };

  getNotesRows() {
    // There's some pretty big accessibility problems here that I would tackle in a real app.
    // Clickable <div> should be replaced with a proper aria tab implementation
    // To at least fix the worst of it I'm swapping the div for a button so that we get keyboard interaction
    return this.state.notes.map((note, index) => (
      <button
        key={note.subject} // I would assume in a real app this would be note.id, as subject is not guaranteed to be unique. -TedA
        onClick={this.selectNote}
        id={String(index)} // Given that element IDs need to be unique across the page, I'd probably find another way to do the selection.
        className={classNames('NotesSidebarItem', {
          // The .indexOf(note) implementation that was here would be adding a lot of looping to get the index number that we already have available.
          selected: index === this.state.currentNoteIndex,
        })}
      >
        <h4 className="NotesSidebarItem-title">{note.subject}</h4>
        {note.read && <img alt="Check Mark" src={checkMark} />}
      </button>
    ));
  }

  // TODO this component should be broken into separate components.

  render() {
    const selectedNote = this.state.notes?.[this.state.currentNoteIndex];

    return (
      <div className="App">
        <header className="App-header">
          {/* Just wanted to call out that having padding embedded in the svg is probably not ideal.
           ** I would get the padding removed from the svg and then put align-items: center on the heading instead of the
           ** current mixture of padding and margin (and padding embedded inside the svg). This would make it much more easy
           ** adjust things later.
           */}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Notes Viewer Test App</h1>
          <div>
            Unread:
            <span className="App-title-unread-count">
              {/* Adding .toLocaleString() because this gives us great freebie handling for 4+ digit numbers */}
              {/* In a functional component (which I would probably write this as in 2020), I would memoize this
               ** number with useMemo. I could store it in state but it's trickier in this class component, so I'm
               ** leaving this simple implementation for now.
               */}
              {this.state.notes.filter((n) => !n.read).length.toLocaleString()}
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
            <h3 className="NoteDetails-title">{selectedNote.subject}</h3>
          )}
          {this.state.notes.length > 0 && (
            <p className="NoteDetails-subject">{selectedNote.body}</p>
          )}
          <button onClick={this.markAsRead}>Mark as read</button>
        </section>
      </div>
    );
  }
}

export default App;
