import * as React from 'react';

import '../styles/App.scss';
import Header from "./Header";
import NotesSidebar from "./NotesSidebar";
import NoteDetails from "./NoteDetails";
import { IAppState, INote } from "../types/types"


class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      notes: [],
      currentNoteIndex: 0,
      isLoading: false,
      isError: false 
    };
   
    this.selectNote = this.selectNote.bind(this); 
  }

  componentDidMount = (): void => {
    //fetched notes and pushed them into state
    this.setState({isLoading: true})
    let url = "http://localhost:4000/notes"
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          notes: data, 
          isLoading:false
        });
      })
      .catch((error) => {
        this.setState({
          isError:true,
          isLoading:false
        })
      }); 
  }

  // fixed callback
  markAsRead = (): any => {
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

  // fixed callback 
  selectNote(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.setState({ currentNoteIndex: event.currentTarget.id });
  }

  // fixed: unread notes count
  getUnreadCount = (): number => {
    let count = 0;
    this.state.notes.forEach((note: INote) => {
      if(!note.read) {
        count++;
      }
    });
    return count;
  }

  // fixed: separated components, added status messages and validations
  render() {
    const { notes, isError, isLoading, currentNoteIndex } = this.state;
    return (
      <div className='App'>
        <Header unReadCount={this.getUnreadCount()} />
        
        {/* error while fetching notes case */}
        {isError && <div className="status">Sorry! something went wrong while getting notes</div>}
        
        {/* no notes case*/}
        {!isLoading && notes.length === 0 && <div className="status">there are currently no notes</div>}
        
        {/* all notes have been read case */}
        {notes.length > 0 && this.getUnreadCount() === 0 && alert("Congrats you read all the notes!")}
        
        {/* notes are loading OR notes are loaded case */}
        {isLoading ? (
          <div className="status">Loading notes....</div>
        ) : (
        <>
          {notes.length > 0 && (
            <div className="notes-wrapper">
              <NotesSidebar 
                notes={notes} 
                currentIndex={currentNoteIndex}
                onSelectNote={this.selectNote} />
              <NoteDetails 
                notes={notes} 
                currentIndex={currentNoteIndex}
                markAsRead={this.markAsRead} /> 
            </div>
          )}
        </>
        )}
      </div>
    );
  }
}

export default App;
