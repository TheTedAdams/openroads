export interface INote {
  subject: string,
  body: string,
  read: boolean
}

export interface IAppState {
  notes: INote[],
  currentNoteIndex: any,
  isLoading: boolean,
  isError: boolean
}

export interface IHeader {
  unReadCount: number
}
export interface INotesSideProps {
  notes:any[],
  currentIndex: number,
  id?: string,
  onSelectNote: any,
}

export interface INotesDetailsProps {
  notes: INote[],
  currentIndex: any,
  markAsRead: () => void
}