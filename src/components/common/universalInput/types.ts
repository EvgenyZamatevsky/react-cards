import { ChangeEvent, FocusEvent, KeyboardEvent, Ref } from 'react'

export type UniversalInputPropsType = {
	setValue?: (value: string) => void
	onEnter?: () => void
	onEscape?: () => void
	errorMessage?: string
	setErrorMessage?: (errorMessage: string) => void
	primary?: boolean
	secondary?: boolean
	additionalPrimaryInput?: string
	additionalSecondaryInput?: string
	spanClassName?: string
	ref?: Ref<HTMLInputElement>

	className?: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
	type?: string
	placeholder?: string
	value: string
	autoFocus?: boolean
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}
