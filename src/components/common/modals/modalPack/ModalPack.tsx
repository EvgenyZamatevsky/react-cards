import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import cross from 'assets/icons/cross.svg'
import style from './ModalPack.module.scss'
import { ModalPackPropsType } from './types'

export const ModalPack: FC<ModalPackPropsType> =
	({
		onDeactivateModalClick,
		value,
		onInputChange,
		onCheckboxChange,
		onSaveClick,
		isPackPrivate,
		title,
		isLabelItem = false
	}): ReturnComponentType => {

		return (
			<div className={style.container}>
				<div className={style.top}>
					<div className={style.title}>{title}</div>
					<img className={style.cross} src={cross} alt='cross' onClick={onDeactivateModalClick} />
				</div>

				<input
					className={style.namePack}
					type='text'
					placeholder='Name pack'
					value={value}
					onChange={onInputChange}
				/>

				{isLabelItem &&
					<label className={style.label}>
						<input
							className={style.privatePack}
							type='checkbox'
							onChange={onCheckboxChange}
							checked={isPackPrivate}
						/>
						Private pack
					</label>}

				<div className={style.buttons}>
					<button className={style.cancelBtn} onClick={onDeactivateModalClick}>Cancel</button>
					<button className={style.saveBtn} onClick={onSaveClick}>Save</button>
				</div>
			</div>
		)
	}
