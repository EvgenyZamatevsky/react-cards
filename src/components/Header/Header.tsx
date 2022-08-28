import React, { FC, useEffect, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import { Link } from 'react-router-dom'
import { Path } from 'enums/Path'
import { useSelector } from 'react-redux'
import { UniversalButton } from 'components/common/universalButton'
import defaultAvatar from 'assets/images/defaultAvatar.png'
import { Popup } from 'components/popup'
import style from './Header.module.scss'
import {
	selectAuthorizedUserAvatar,
	selectAuthorizedUserName,
	selectIsAuth,
	selectIsAvatarBroken,
	selectIsDisabled,
} from 'store/selectors'

export const Header: FC = (): ReturnComponentType => {

	const isAuth = useSelector(selectIsAuth)
	const authorizedUserAvatar = useSelector(selectAuthorizedUserAvatar)
	const authorizedUserName = useSelector(selectAuthorizedUserName)
	const isDisabled = useSelector(selectIsDisabled)
	const isAvatarBroken = useSelector(selectIsAvatarBroken)

	const [isVisiblePopup, setIsVisiblePopup] = useState(false)

	const authorizedUserRef = useRef<HTMLDivElement>(null)

	const onTogglePopupClick = (): void => setIsVisiblePopup(!isVisiblePopup)

	useEffect(() => {
		const onOutsideClick = (e: MouseEvent) => {
			const event = e as MouseEvent & { path: Node[] }

			if (authorizedUserRef.current && !event.path.includes(authorizedUserRef.current)) {
				setIsVisiblePopup(false)
			}
		}

		document.body.addEventListener('click', onOutsideClick)

		return () => document.body.removeEventListener('click', onOutsideClick)
	}, [])

	return (
		<header className={style.container} >
			<div className={style.title}>Cards</div>
			{isAuth
				? <div className={style.authorizedUser} ref={authorizedUserRef}>
					<UniversalButton
						className={style.name}
						onClick={onTogglePopupClick}
						disabled={isDisabled}
					>
						{authorizedUserName}
					</UniversalButton>
					<img
						className={style.avatarImage}
						src={isAvatarBroken ? defaultAvatar : authorizedUserAvatar}
						alt='avatar'
					/>
					{isVisiblePopup && <Popup setIsVisiblePopup={setIsVisiblePopup} />}
				</div>
				: <Link
					to={Path.LOGIN}
					className={`${style.signInBtn} ${isDisabled && style.disabledLink}`}
				>
					Sign in
				</Link>}
		</header>
	)
}
