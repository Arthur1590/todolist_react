import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Notes from './components/Notes'
import editIcon from './assets/images/edit.svg'
import Modal from './components/Modal'
import { TodoContext } from './context/todoContext'
import { INote } from './types'

function App() {
	// * local storage
	const setLS = () => (localStorage.notes = JSON.stringify(notes))
	const getLS = ():INote[] => (localStorage.notes ? JSON.parse(localStorage.notes) : [])
	const [notes, setNotes] = useState(getLS)

	// *
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [editNote, setEditNote] = useState<null | INote>(null)
	const [search, setSearch] = useState<string>('')

  // * поиск по статьям
	const filtetedNotes = notes.filter(item =>
		item.title.toLowerCase().includes(search.toLowerCase())
	)

	useEffect(() => {
		setLS()
	}, [notes])

	const openModalHandler = () => {
		setIsEdit(false)
		setEditNote(null)
		setIsModalOpen(true)
	}

	const closeModalHandler = () => {
		setIsModalOpen(false)
	}

	const addOrChangeHandler = (note: INote) => {
		if (editNote?.id) {
			const updateNotes = notes.map(el => {
				if (el.id == note.id) {
					return note
				}
				return el
			})
			setNotes(updateNotes)
		} else {
			setNotes([...notes, note])
		}
	}

	const deleteNoteHandler = (id: string) => {
		setNotes(notes.filter(note => note.id != id))
	}

	const changeHandler = (note: INote) => {
		setEditNote(note)
		setIsModalOpen(true)
		setIsEdit(true)
	}

	return (
		<>
			<TodoContext.Provider
				value={{
					closeModalHandler,
					addOrChangeHandler,
					deleteNoteHandler,
					changeHandler,
					search,
					setSearch,
				}}
			>
				<Navbar />
				<Notes notes={filtetedNotes} />
				{isModalOpen && <Modal editNote={editNote} isEdit={isEdit} />}
				<button className='btn__add' onClick={() => openModalHandler()}>
					<img src={editIcon} alt='' />
				</button>
			</TodoContext.Provider>
		</>
	)
}

export default App
