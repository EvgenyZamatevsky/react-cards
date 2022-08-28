import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Preloader.module.scss'

export const Preloader: FC = (): ReturnComponentType => {
	return (
		<div className={style.preloader}>
			<div className={style.bounceOne}></div>
			<div className={style.bounceTwo}></div>
			<div className={style.bounceThree}></div>
		</div>
	)
}
