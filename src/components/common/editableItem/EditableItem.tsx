import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { ReturnComponentType } from 'types'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import { Key } from 'enums'
import { EditableItemPropsType } from './types'
import pencil from 'assets/icons/pencil.svg'
import style from './EditableItem.module.scss'
import { UniversalButton } from '../universalButton'

export const EditableItem: FC<EditableItemPropsType> =
	({ currentValue, isDisabled, updateValue }): ReturnComponentType => {

		const [isEditMode, setIsEditMode] = useState(false)
		const [updatedValue, setUpdatedValue] = useState(EMPTY_STRING)
		const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)

		const onSetCurrentValueClick = (): void => {
			setIsEditMode(true)
			setUpdatedValue(currentValue)
		}

		const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setUpdatedValue(event.currentTarget.value)

			if (errorMessage) {
				setErrorMessage(EMPTY_STRING)
			}
		}

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

		const onUpdateValueValueBlur = (): void => handleUpdateValueBlurOrKeyDown()

		const onUpdateValueKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
			if (event.key === Key.ENTER) {
				handleUpdateValueBlurOrKeyDown()
				return
			}

			if (event.key === Key.ESCAPE) {
				setIsEditMode(false)
				return
			}
		}

		return (
			<>
				{isEditMode
					? <>
						<input
							className={style.newNameInput}
							type='text'
							placeholder='Enter a new name'
							autoFocus
							onChange={onInputChange}
							value={updatedValue}
							onBlur={onUpdateValueValueBlur}
							onKeyDown={onUpdateValueKeyDown}
						/>
						{errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
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
