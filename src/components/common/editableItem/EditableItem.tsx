import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { ReturnComponentType } from 'types'
import pencil from 'assets/icons/pencil.svg'
import { EMPTY_STRING } from 'constants/base'
import { Key } from 'enums'
import style from './EditableItem.module.scss'
import { EditableItemPropsType } from './types'

export const EditableItem: FC<EditableItemPropsType> =
	({ currentValue, isDisabled, changeCurrentValue }): ReturnComponentType => {

		const [isEditMode, setIsEditMode] = useState(false)
		const [newValue, setNewValue] = useState(EMPTY_STRING)
		const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)

		const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setNewValue(event.currentTarget.value)

			if (errorMessage) {
				setErrorMessage(EMPTY_STRING)
			}
		}

		const onSetCurrentValueClick = (): void => {
			setIsEditMode(true)
			setNewValue(currentValue)
		}

		const handleSetNewValueBlurAndKeyDown = (): void => {
			const newValueTrimmed = newValue.trim()

			if (newValueTrimmed !== EMPTY_STRING) {
				setIsEditMode(false)

				if (currentValue !== newValueTrimmed) {
					changeCurrentValue(newValueTrimmed)
				}

			} else {
				setErrorMessage('Title is required!')
			}
		}

		const onSetNewValueBlur = (): void => handleSetNewValueBlurAndKeyDown()

		const onSetNewValueKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
			if (event.key === Key.ENTER) {
				handleSetNewValueBlurAndKeyDown()
			}
		}

		return (
			<>
				{isEditMode
					? <>
						<input
							className={`${style.newNameField} ${errorMessage && style.errorBorder}`}
							type='text'
							placeholder='Enter a new name'
							autoFocus
							onChange={onInputChange}
							value={newValue}
							onBlur={onSetNewValueBlur}
							onKeyDown={onSetNewValueKeyDown}
						/>
						{errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
					</>
					: <button
						className={style.editableItem}
						disabled={isDisabled}
						onClick={onSetCurrentValueClick}
					>
						{currentValue}
						<img src={pencil} alt='pencil' />
					</button>}
			</>
		)
	}
