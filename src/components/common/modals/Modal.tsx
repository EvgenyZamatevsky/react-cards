import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { ModalPropsType } from './types'
import style from './Modal.module.scss'

export const Modal: FC<ModalPropsType> = ({ children, isModalActive, onDeactivateModalClick }): ReturnComponentType => {
	return (
		<div className={`${style.modal} ${isModalActive && style.active}`} onClick={onDeactivateModalClick}>
			<div className={style.content} onClick={event => event.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}
