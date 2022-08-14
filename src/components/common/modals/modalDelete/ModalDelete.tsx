import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import cross from 'assets/icons/cross.svg'
import style from './ModalDelete.module.scss'

type ModalDeletePropsType = {
	onDeactivateModalClick: () => void
	onDeleteClick: () => void
	title: string
	name: string
}

export const ModalDelete: FC<ModalDeletePropsType> =
	({ onDeactivateModalClick, onDeleteClick, title, name }): ReturnComponentType => {
		return (
			<div className={style.container}>
				<div className={style.top}>
					<div className={style.title}>{title}</div>
					<img className={style.cross} src={cross} alt='cross' onClick={onDeactivateModalClick} />
				</div>

				<div className={style.body}>
					Do you really want to remove <span className={style.name}>{name}</span>?
					<div>All cards will be deleted.</div>
				</div>

				<div className={style.buttons}>
					<button className={style.cancelBtn} onClick={onDeactivateModalClick}>Cancel</button>
					<button className={style.deleteBtn} onClick={onDeleteClick}>Delete</button>
				</div>
			</div>
		)
	}
