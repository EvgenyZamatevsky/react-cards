import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'

type ModalUpdatePropsType = {
	value: string
	onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
	onDeactivateModalClick: () => void
	onSaveClick: () => void
}

export const ModalUpdate: FC<ModalUpdatePropsType> =
	({ value, onInputChange, onDeactivateModalClick, onSaveClick }): ReturnComponentType => {
		return (
			<>
				<input type='text' placeholder='text...' value={value} onChange={onInputChange} />
				<button onClick={onDeactivateModalClick}>Cancel</button>
				<button onClick={onSaveClick}>Save</button>
			</>
		)
	}
