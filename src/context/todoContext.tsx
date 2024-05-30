import { createContext } from 'react'
import { INote } from '../types'

interface ItodoContext {
	closeModalHandler: () => void;
	addOrChangeHandler: (note: INote) => void;
	deleteNoteHandler: (id: string) => void;
	changeHandler: (note: INote) => void;
	search: string;
	setSearch: () => void;
}

export const TodoContext = createContext<ItodoContext>({} as ItodoContext)
