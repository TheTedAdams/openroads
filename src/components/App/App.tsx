import './App.scss';

import React, { Component } from 'react';

import { AppHeader, NoteDetails, NotesSidebar } from '../';
import { Note } from '../../models';

interface AppProps {
  /* EMPTY */
}

interface AppState {
  notes: Note[];
  currentNoteIndex: number;
  loading: boolean;
  errorMessage?: string;
}

export class App extends Component<AppProps, AppState> {
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

  constructor(props: AppProps) {
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
  markCurrentNoteAsRead = () => {
    this.setState((currentState) => {
      let marked = {
        ...currentState.notes[currentState.currentNoteIndex],
        read: true,
      };
      let notes = [...currentState.notes];
      notes[currentState.currentNoteIndex] = marked;
      return { ...currentState, notes };
    });
  };

  selectNote = (index: number) => {
    this.setState({ currentNoteIndex: index });
  };

  render() {
    const { notes, currentNoteIndex, loading } = this.state;

    return (
      <div className="App">
        <AppHeader
          isLoading={loading}
          /* In a functional component (which I would probably write this as if writing today), I would memoize this
           * number with useMemo. I could store it in state but it's trickier in this class component, so I'm
           * leaving this simple implementation for now.
           */
          unreadCount={notes.filter((n) => !n.read).length}
        />
        <NotesSidebar
          isLoading={loading}
          notes={notes}
          currentNoteIndex={currentNoteIndex}
          onSelectNote={this.selectNote}
        />
        <NoteDetails
          isLoading={loading}
          selectedNote={notes?.[currentNoteIndex]}
          onMarkAsRead={this.markCurrentNoteAsRead}
        />
      </div>
    );
  }
}
