import React, { FC, forwardRef } from 'react'
import { ReturnComponentType } from 'types'
import { ModalPackPropsType } from './types'
import { UniversalButton } from 'components/common/universalButton'
import { UniversalInput } from 'components/common/universalInput'
import cross from 'assets/icons/cross.svg'
import style from './ModalPack.module.scss'

export const ModalPack: FC<ModalPackPropsType> =
	forwardRef(({
		onDeactivateModalClick,
		value,
		setUpdatedPackName,
		onCheckboxChange,
		onSaveClick,
		isPackPrivate,
		title,
		errorMessage,
		setErrorMessage,
		isLabelItem = false
	},
		ref): ReturnComponentType => {

		return (
			<div className={style.container}>
				<div className={style.top}>
					<div className={style.title}>{title}</div>
					<img className={style.cross} src={cross} alt='cross' onClick={onDeactivateModalClick} />
				</div>

				<UniversalInput
					primary
					additionalPrimaryInput={style.namePack}
					type='text'
					placeholder='Name pack'
					value={value}
					setValue={setUpdatedPackName}
					ref={ref}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
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
					<UniversalButton className={style.cancelBtn} onClick={onDeactivateModalClick}>Cancel</UniversalButton>
					<UniversalButton className={style.saveBtn} onClick={onSaveClick}>Save</UniversalButton>
				</div>
			</div>
		)
	})
