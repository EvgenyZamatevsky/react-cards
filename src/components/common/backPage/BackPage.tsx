import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import arrow from 'assets/icons/arrow.svg'
import style from './BackPage.module.scss'

type BackPagePropsType = {
	isDisabled: boolean
	title: string
	onBackPageClick: () => void
}

export const BackPage: FC<BackPagePropsType> = ({ isDisabled, title, onBackPageClick }): ReturnComponentType => {
	return (
		<button
			className={style.backPageBtn}
			onClick={onBackPageClick}
			disabled={isDisabled}>
			<img className={style.arrowIcon} src={arrow} alt='arrow' />
			<div>{title}</div>
		</button>
	)
}
