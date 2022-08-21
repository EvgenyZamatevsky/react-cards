import React, { ChangeEvent, FC, forwardRef } from 'react'
import { ReturnComponentType } from 'types'
import cross from 'assets/icons/cross.svg'
import style from './ModalPack.module.scss'
import { ModalPackPropsType } from './types'
import { UniversalButton } from 'components/common/universalButton'

export const ModalPack: FC<ModalPackPropsType> =
	forwardRef(({
		onDeactivateModalClick,
		value,
		onInputChange,
		onCheckboxChange,
		onSaveClick,
		isPackPrivate,
		title,
		errorMessage,
		isLabelItem = false
	},
		ref): ReturnComponentType => {

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
					ref={ref}
				/>

				{errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}

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
					<UniversalButton className={style.cancelBtn} onClick={onDeactivateModalClick}>Cancel</UniversalButton>
					<UniversalButton className={style.saveBtn} onClick={onSaveClick}>Save</UniversalButton>
				</div>
			</div>
		)
	})
