import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { BackToPagePropsType } from './types'
import { UniversalButton } from '../universalButton'
import arrow from 'assets/icons/arrow.svg'
import style from './BackToPage.module.scss'

export const BackToPage: FC<BackToPagePropsType> =
	({ title, isDisabled, onBackToPageClick, }): ReturnComponentType => {
		return (
			<UniversalButton
				className={style.backToPageBtn}
				onClick={onBackToPageClick}
				disabled={isDisabled}
			>

				<img className={style.arrowIcon} src={arrow} alt='arrow' />

				<div>{title}</div>
			</UniversalButton>
		)
	}
