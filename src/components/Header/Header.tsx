import React, { FC, useEffect } from 'react'
import { ReturnComponentType } from 'types'
import style from './Header.module.scss'
import user from 'assets/icons/user.png'
import packs from 'assets/icons/packs.png'
import { NavLink } from 'react-router-dom'
import { Path } from 'enums/Path'
import { getPacks } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'

export type HeaderPropsType = {

}

export const Header: FC<HeaderPropsType> = (): ReturnComponentType => {
	return (
		<header className={style.header}>
			<div className={style.content}>
				<div className={style.navBar}>
					<NavLink
						to={Path.PACKS}
						className={({ isActive }) => (isActive ? ` ${style.link} ${style.active}` : `${style.link}`)}>
						<img className={style.cardsImage} src={packs} />
						<div className={style.name}>Packs list</div>
					</NavLink>
					<NavLink
						to={Path.PROFILE}
						className={({ isActive }) => (isActive ? ` ${style.link} ${style.active}` : `${style.link}`)}>
						<img className={style.userImage} src={user} />
						<div className={style.name}>Profile</div>
					</NavLink>
				</div>
			</div>
		</header>
	)
}
