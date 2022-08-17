import React, { FC, useEffect, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import { NavLink, useNavigate } from 'react-router-dom'
import { Path } from 'enums/Path'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserData, selectIsAuth, selectIsDisabled } from 'store/selectors'
import avatar from 'assets/images/avatar.png'
import logOutIcon from 'assets/icons/logOut.png'
import person from 'assets/icons/person.svg'
import { useAppDispatch } from 'store/hooks'
import { logOut } from 'store/asyncActions'
import style from './Header.module.scss'

export const Header: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const isAuth = useSelector(selectIsAuth)
	const authorizedUser = useSelector(selectAuthorizedUserData)
	const isDisabled = useSelector(selectIsDisabled)

	const [isVisiblePopup, setIsVisiblePopup] = useState(false)

	const itemRef = useRef<HTMLDivElement>(null)

	const avatarAuthorizedUser = authorizedUser?.avatar ? authorizedUser?.avatar : avatar

	useEffect(() => {
		const onOutsideClick = (event: any) => {
			if (!event.path.includes(itemRef.current)) {
				setIsVisiblePopup(false)
			}
		}

		document.body.addEventListener('click', onOutsideClick)

		return () => document.body.removeEventListener('click', onOutsideClick)
	}, [])

	const onShowPopupClick = (): void => setIsVisiblePopup(!isVisiblePopup)

	const onLogOutClick = (): void => {
		dispatch(logOut())
		setIsVisiblePopup(false)
	}

	const onGoProfileClick = (): void => {
		navigate(Path.PROFILE)
		setIsVisiblePopup(false)
	}

	return (
		<header className={style.container} ref={itemRef}>
			<div className={style.title}>Cards</div>
			{isAuth
				? <div className={style.authorizedUser}>
					<button
						className={style.name}
						onClick={onShowPopupClick}
						disabled={isDisabled}
					>{authorizedUser?.name}</button>
					<img className={style.image} src={avatarAuthorizedUser} alt='avatar' />
					{isVisiblePopup &&
						<div className={style.popup}>
							<button className={style.profileBtn} onClick={onGoProfileClick}>
								<img className={style.personIcon} src={person} alt='user' />
								Profile
							</button>
							<button className={style.logOutBtn} onClick={onLogOutClick}>
								<img className={style.logOutIcon} src={logOutIcon} alt='log out' />
								Log Out
							</button>
						</div>}
				</div>
				: <NavLink to={Path.LOGIN} className={style.signInBtn}>Sign in</NavLink>}
		</header>
	)
}
