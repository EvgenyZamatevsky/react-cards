import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { useSelector } from 'react-redux'
import { selectIsDisabled } from 'store/selectors'
import { BackToPagePropsType } from './types'
import arrow from 'assets/icons/arrow.svg'
import { UniversalButton } from '../universalButton'
import style from './BackToPage.module.scss'

export const BackToPage: FC<BackToPagePropsType> = ({ title, onBackToPageClick }): ReturnComponentType => {

	const isDisabled = useSelector(selectIsDisabled)

	return (
		<UniversalButton
			className={style.backToPageBtn}
			onClick={onBackToPageClick}
			disabled={isDisabled}>
			<img className={style.arrowIcon} src={arrow} alt='arrow' />
			<div>{title}</div>
		</UniversalButton>
	)
}
