import { ChangeEvent } from 'react'

export type ModalPackPropsType = {
	value: string
	onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
	onDeactivateModalClick: () => void
	onSaveClick: () => void
	title: string
	onCheckboxChange?: (event: ChangeEvent<HTMLInputElement>) => void
	isPackPrivate?: boolean
	isLabelItem?: boolean
}
