import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { NavLink } from 'react-router-dom'
import { Path } from 'enums/Path'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserData, selectIsAuth } from 'store/selectors'
import avatar from 'assets/images/avatar.png'
import { useAppDispatch } from 'store/hooks'
import { logOut } from 'store/asyncActions'
import style from './Header.module.scss'

export type HeaderPropsType = {

}

export const Header: FC<HeaderPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)
	const authorizedUser = useSelector(selectAuthorizedUserData)

	const avatarAuthorizedUser = authorizedUser?.avatar ? authorizedUser?.avatar : avatar

	return (
		<header className={style.container}>
			<div className={style.title}>Cards</div>
			{isAuth
				? <div className={style.authorizedUser}>
					<div className={style.name} onClick={() => dispatch(logOut())}>{authorizedUser?.name}</div> {/* Временный log out при нажатии на name */}
					<img className={style.image} src={avatarAuthorizedUser} alt='avatar' />
				</div>
				: <NavLink to={Path.LOGIN} className={style.signInBtn}>Sign in</NavLink>}
		</header>
		// <header className={style.header}>
		// 	<div className={style.content}>
		// 		<div className={style.navBar}>
		// 			<NavLink
		// 				to={Path.PACKS}
		// 				className={({ isActive }) => (isActive ? ` ${style.link} ${style.active}` : `${style.link}`)}>
		// 				<img className={style.cardsImage} src={packs} />
		// 				<div className={style.name}>Packs list</div>
		// 			</NavLink>
		// 			<NavLink
		// 				to={Path.PROFILE}
		// 				className={({ isActive }) => (isActive ? ` ${style.link} ${style.active}` : `${style.link}`)}>
		// 				<img className={style.userImage} src={user} />
		// 				<div className={style.name}>Profile</div>
		// 			</NavLink>
		// 		</div>
		// 	</div>
		// </header>
	)
}
