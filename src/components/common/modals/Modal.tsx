import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Modal.module.scss'
import { ModalPropsType } from './types'

export const Modal: FC<ModalPropsType> = ({ children, isModalActive, onDeactivateModalClick }): ReturnComponentType => {
	return (
		<div className={`${style.modal} ${isModalActive && style.modalActive}`} onClick={onDeactivateModalClick}>
			<div className={style.content} onClick={event => event.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}
