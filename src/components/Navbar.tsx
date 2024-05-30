import { useState, useContext } from 'react'
import searchIcon from '../assets/images/search.svg'
import backIcon from '../assets/images/back.svg'
import closeIcon from '../assets/images/close.svg'
import { TodoContext } from '../context/todoContext'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
	const { search, setSearch } = useContext(TodoContext)
	const [show, setShow] = useState(true)
	const [language, setLanguage] = useState('ru')

	const { t, i18n } = useTranslation()

	const changeLanguage = () => {
		const currentLanguage = language == 'ru' ? 'uz' : 'ru'
		setLanguage(currentLanguage)
		i18n.changeLanguage(currentLanguage)
	}

	return (
		<header className='header'>
			<nav className='header__nav'>
				{show ? (
					<>
						<button
							className='header__nav-lang'
							onClick={() => changeLanguage()}
						>
							{language == 'ru' ? 'uz' : 'ru'}
						</button>
						<h1 className='header__nav-title'>{t('title')}</h1>
						<button
							className='header__nav-search'
							onClick={() => setShow(false)}
						>
							<img src={searchIcon} alt='' />
						</button>
					</>
				) : (
					<>
						<button className='header__nav-close' onClick={() => setShow(true)}>
							<img src={backIcon} alt='' />
						</button>
						<input
							type='text'
							className='header__nav-input'
							placeholder='Поиск...'
							value={search}
							onChange={event => setSearch(event.target.value)}
						/>
						<button className='header__nav-clear'>
							<img src={closeIcon} alt='' />
						</button>
					</>
				)}
			</nav>
		</header>
	)
}

export default Navbar
