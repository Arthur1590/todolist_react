import editIcon from '../assets/images/edit.svg'
import delIcon from '../assets/images/del.svg'
import clsx from 'clsx'
import { useContext } from 'react'
import { TodoContext } from '../context/todoContext'


const NotesItem = ({ note, view }) => {
    
    const notesItemTop = clsx('notes__item-top', {'active': !view})
    
    const { deleteNoteHandler, changeHandler } = useContext(TodoContext)
    
  return (
    <div className="notes__item">
        <div className={notesItemTop}>
            <h2>{note.title}</h2>
            <span>{note.date}</span>
        </div>
        <p className="notes__item-text">{note.text}</p>
        <div className="notes__item-btns">
            <button className="notes__item-btn purple" onClick={() => changeHandler(note)}>
                <img src={editIcon} alt="" />
                <span>РЕДАКТИРОВАТЬ</span>
            </button>
            <button className="notes__item-btn red" onClick={() => deleteNoteHandler(note.id)}>
                <img src={delIcon} alt="" />
                <span>Удалить</span>
            </button>
        </div>
    </div>
  )
}

export default NotesItem