import React, { FC, useState } from 'react'
import { ReturnComponentType } from 'types'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import { EditableItemPropsType } from './types'
import { UniversalButton } from '../universalButton'
import { UniversalInput } from '../universalInput'
import pencil from 'assets/icons/pencil.svg'
import style from './EditableItem.module.scss'

export const EditableItem: FC<EditableItemPropsType> =
	({ currentValue, isDisabled, updateValue }): ReturnComponentType => {

		const [isEditMode, setIsEditMode] = useState(false)
		const [updatedValue, setUpdatedValue] = useState(EMPTY_STRING)
		const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)

		const onSetCurrentValueClick = (): void => {
			setIsEditMode(true)
			setUpdatedValue(currentValue)
		}

		const handleDeactivateIsEditModeKeyDown = (): void => setIsEditMode(false)

		const handleUpdateValueBlurOrKeyDown = (): void => {
			const updatedValueTrimmed = updatedValue.trim()

			if (updatedValueTrimmed !== EMPTY_STRING) {
				setIsEditMode(false)

				if (currentValue !== updatedValueTrimmed) {
					updateValue(updatedValueTrimmed)
				}

			} else {
				setErrorMessage(ERROR_MESSAGE)
			}
		}

		return (
			<>
				{isEditMode
					? <>
						{/* <input
							className={style.newNameInput}
							type='text'
							placeholder='Enter a new name'
							autoFocus
							onChange={onInputChange}
							value={updatedValue}
							onBlur={onUpdateValueBlur}
							onKeyDown={onUpdateValueKeyDown}
						/> */}
						<UniversalInput
							primary
							additionalPrimaryInput={style.newNameInput}
							placeholder='Enter a new name'
							autoFocus
							setValue={setUpdatedValue}
							value={updatedValue}
							onBlur={handleUpdateValueBlurOrKeyDown}
							onEnter={handleUpdateValueBlurOrKeyDown}
							onEscape={handleDeactivateIsEditModeKeyDown}
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
						/>
					</>
					: <UniversalButton
						className={style.editableItemBtn}
						disabled={isDisabled}
						onClick={onSetCurrentValueClick}
					>
						{currentValue}
						<img className={style.pencilIcon} src={pencil} alt='pencil' />
					</UniversalButton>}
			</>
		)
	}
