import { ChangeEvent, Ref } from 'react'

export type ModalPackPropsType = {
	value: string
	setUpdatedPackName: (updatedPackName: string) => void
	onDeactivateModalClick: () => void
	onSaveClick: () => void
	title: string
	errorMessage: string
	setIsPackPrivate?: (isPackPrivate: boolean) => void
	setErrorMessage: (errorMessage: string) => void
	isPackPrivate?: boolean
	isLabelItem?: boolean
	ref: Ref<HTMLInputElement>
}
