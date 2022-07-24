import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './NavBar.module.scss'

type NavBarPropsType = {

}

export const NavBar: FC<NavBarPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.navBar}>
			<div className={style.content}>
				<h2 className={style.title}>Show packs cards</h2>
				<div className={style.buttons}>
					<button className={style.myBtn}>My</button>
					<button className={style.allBth}>All</button>
				</div>
			</div>
			<div className={style.bottom}>
				<div className={style.text}>Number of cards</div>
				<input className={style.range} type="range" />
			</div>
			<button className={style.resetBtn}>Reset filters</button>
		</div>
	)
}
