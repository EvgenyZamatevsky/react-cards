import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { selectIsModalActive } from 'store/selectors'
import { setIsModalActive } from 'store/slices'
import { ReturnComponentType } from 'types'
import style from './Modal.module.scss'

type ModalPropsType = {
	children: ReactNode
}

export const Modal: FC<ModalPropsType> = ({ children }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isModalActive = useSelector(selectIsModalActive)

	const onDeactivateModalClick = (): void => {
		dispatch(setIsModalActive(false))
	}

	return (
		<div className={`${style.modal} ${isModalActive && style.modalActive}`} onClick={onDeactivateModalClick}>
			<div className={`${style.content} ${isModalActive && style.contentActive}`} onClick={event => event.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}
