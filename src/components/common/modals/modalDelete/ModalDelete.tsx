import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import cross from 'assets/icons/cross.svg'
import style from './ModalDelete.module.scss'
import { ModalDeletePropsType } from './types'
import { UniversalButton } from 'components/common/universalButton'

export const ModalDelete: FC<ModalDeletePropsType> =
	({ onDeactivateModalClick, onDeleteClick, title, name, isPackDelete = true }): ReturnComponentType => {
		return (
			<div className={style.container}>
				<div className={style.top}>
					<div className={style.title}>{title}</div>
					<img className={style.cross} src={cross} alt='cross' onClick={onDeactivateModalClick} />
				</div>

				<div className={style.body}>
					Do you really want to remove <span className={style.name}>{name}</span> {!isPackDelete && 'card'}?

					{isPackDelete && <div>All cards will be deleted.</div>}
				</div>

				<div className={style.buttons}>
					<UniversalButton className={style.cancelBtn} onClick={onDeactivateModalClick}>Cancel</UniversalButton>
					<UniversalButton className={style.deleteBtn} onClick={onDeleteClick}>Delete</UniversalButton>
				</div>
			</div>
		)
	}
