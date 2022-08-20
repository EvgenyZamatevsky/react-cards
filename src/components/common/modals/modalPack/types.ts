import { ChangeEvent, Ref } from 'react'

export type ModalPackPropsType = {
	value: string
	onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
	onDeactivateModalClick: () => void
	onSaveClick: () => void
	title: string
	errorMessage: string
	onCheckboxChange?: (event: ChangeEvent<HTMLInputElement>) => void
	isPackPrivate?: boolean
	isLabelItem?: boolean
	ref: Ref<HTMLInputElement>
}
