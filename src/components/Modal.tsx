import { useContext, useState } from 'react'
import { TodoContext } from '../context/todoContext'
import { v4 } from 'uuid'

const Modal = ({ isEdit, editNote }) => {
	const { closeModalHandler, addOrChangeHandler } = useContext(TodoContext)

	const [title, setTitle] = useState(editNote?.title ?? '')
	const [text, setText] = useState(editNote?.text ?? '')
	const [errorMsg, setErrorMsg] = useState(false)

	const addOrChange = () => {
		if (title.length > 2 && text.length > 2) {
			const note = {
				id: editNote?.id ?? v4(),
				title: title,
				text: text,
				date: new Date().toLocaleDateString(),
			}
			addOrChangeHandler(note)
			closeModalHandler()
		} else {
			setErrorMsg(true)
		}
	}

	return (
		<div className='modal' onClick={() => closeModalHandler()}>
			<div className='modal__block' onClick={event => event.stopPropagation()}>
				<h2 className='modal__block-title'>
					{isEdit ? 'Изменить заметку' : 'Добавить заметку'}
				</h2>
				<div className='modal__block-inputs'>
					<label>
						<input
							type='text'
							placeholder='Title'
							value={title}
							onChange={event => setTitle(event.target.value)}
						/>
						<span>Title</span>
					</label>
					<label>
						<input
							type='text'
							placeholder='Content'
							value={text}
							onChange={event => setText(event.target.value)}
						/>
						<span>Content</span>
					</label>
				</div>
				{errorMsg && (
					<h2 className='modal__error'>
						Вы должны вести минимум 3 символа для каждого поля
					</h2>
				)}
				<div className='modal__block-btns'>
					<button className='red' onClick={closeModalHandler}>
						отмена
					</button>
					<button className='purple' onClick={addOrChange}>
						{isEdit ? 'Изменить' : 'Добавить'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal
